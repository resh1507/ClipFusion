import Note from '../models/Note.js';

// Save new note
export const saveNote = async (req, res) => {
  try {
    const { videoLink, timestamp, text } = req.body;
    const newNote = new Note({
      videoLink,
      timestamp,
      text,
      userId: req.user.id,
    });
    await newNote.save();
    res.json(newNote);
  } catch (error) {
    res.status(500).json({ message: 'Error saving note' });
  }
};

// Get all notes for the user
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes' });
  }
};

// Delete note by ID
export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(noteId);
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note' });
  }
};

// Update note by ID
export const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const { videoLink, timestamp, text } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { videoLink, timestamp, text },
      { new: true }
    );

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: 'Error updating note' });
  }
};

