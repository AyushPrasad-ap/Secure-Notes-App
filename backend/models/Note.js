import { Schema, model } from 'mongoose';

const NoteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  body: { type: String, default: '' },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export default model('Note', NoteSchema);
