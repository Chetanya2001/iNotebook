import express from "express";
import checkAuth from "../middleware/middleware.js";
import Notes from "../models/Notes.model.js";
import pkg from "express-validator";
const { body, validationResult } = pkg;
const router = express.Router();

// Route 1: Get All notes using Get Method : /api/auth/getNotes
router.get("/getNotes", checkAuth, async (req, res) => {
  const notes = await Notes.find({ username: req.userData.user.username });
  if (!notes) {
    res.status(400).json({ error: "Notes not found" });
  }
  res.status(200).json(notes);
});
// Route 1: Post notes using Post Method : /api/auth/getNotes
router.post(
  "/addNotes",
  checkAuth,
  [
    body("title", "Enter a Valid Title").isLength({ min: 3 }),
    body("description", "Description Atleast must be 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        username: req.userData.user.username,
      });
      const saveNote = await note.save();
      res.status(200).json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
export default router;
