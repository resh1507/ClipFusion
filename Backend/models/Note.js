import e from 'express';
import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  videoLink: { type: String, required: true },
  timestamp: { type: String, required: true },
  text: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);
export default Note;