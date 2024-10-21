import express from "express";
import checkAuth from "../middleware/middleware.js";
import Notes from "../models/Notes.model.js";
const router = express.Router();

// Route 1: Get All notes using Get Method : /api/auth/getNotes
router.get;
"/getNotes",
  checkAuth,
  async (req, res) => {
    const notes = await Notes.findAll({ username: req.userData.user.username });
    if (!notes) {
      res.status(400).json({ error: "Notes not found" });
    }
    res.status(200).json(notes);
  };

export default router;
