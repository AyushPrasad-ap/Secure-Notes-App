import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  body: { type: String },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Note', NoteSchema);
