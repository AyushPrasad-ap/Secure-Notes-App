import express from 'express';
import { check, validationResult } from 'express-validator';
import auth from '../middleware/auth.js';
import Note from '../models/Note.js';

const router = express.Router();

router.post('/', [auth, check('title').notEmpty()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const note = new Note({
      user: req.user.id,
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags
    });
    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get('/', auth, async (req, res) => {
  const { q, tag } = req.query;
  const filter = { user: req.user.id };

  if (q) filter.$or = [
    { title: new RegExp(q, 'i') },
    { body: new RegExp(q, 'i') }
  ];

  if (tag) filter.tags = tag;

  try {
    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Not found' });

    if (note.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Unauthorized' });

    note = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Not found' });

    if (note.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Unauthorized' });

    // safer delete (works across Mongoose versions)
    await Note.findByIdAndDelete(req.params.id);

    return res.json({ msg: 'Note deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
});

export default router;
