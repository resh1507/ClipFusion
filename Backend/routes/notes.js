import express from "express";
const router = express.Router();
import { saveNote, getNotes, deleteNote, updateNote } from '../controllers/noteController.js';
import authMiddleware from '../middleware/authMiddleware.js';

// Get all notes
router.get('/', authMiddleware, getNotes);

// Save new note
router.post('/', authMiddleware, saveNote);

// Delete note by ID
router.delete('/:id', authMiddleware, deleteNote);

// Update note by ID
router.put('/:id', authMiddleware, updateNote);


export default router;
