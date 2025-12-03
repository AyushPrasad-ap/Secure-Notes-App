import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import auth from '../middleware/auth';
import Note, { find, findById, findByIdAndUpdate } from '../models/Note';
const router = Router();

// CREATE note
router.post('/', [ auth, check('title', 'Title is required').notEmpty() ], async (req, res) => {
  const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const note = new Note({ user: req.user.id, title: req.body.title, body: req.body.body || '', tags: req.body.tags || [] });
    await note.save();
    res.json(note);
  } catch (err) { console.error(err.message); res.status(500).send('Server error'); }
});

// READ notes with optional search q and tag filter
router.get('/', auth, async (req, res) => {
  try {
    const { q, tag } = req.query;
    const filter = { user: req.user.id };
    if (q) filter.$or = [{ title: new RegExp(q, 'i') }, { body: new RegExp(q, 'i') }];
    if (tag) filter.tags = tag;
    const notes = await find(filter).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) { console.error(err.message); res.status(500).send('Server error'); }
});

// UPDATE note
router.put('/:id', auth, async (req, res) => {
  try {
    let note = await findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note not found' });
    if (note.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    const updates = { title: req.body.title, body: req.body.body, tags: req.body.tags };
    note = await findByIdAndUpdate(req.params.id, { $set: updates }, { new: true });
    res.json(note);
  } catch (err) { console.error(err.message); res.status(500).send('Server error'); }
});

// DELETE note
router.delete('/:id', auth, async (req, res) => {
  try {
    let note = await findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note not found' });
    if (note.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
    await note.remove();
    res.json({ msg: 'Note removed' });
  } catch (err) { console.error(err.message); res.status(500).send('Server error'); }
});

export default router;
