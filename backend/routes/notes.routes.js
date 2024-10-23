import express from "express";
import checkAuth from "../middleware/middleware.js";
import Notes from "../models/Notes.model.js";
import pkg, { check } from "express-validator";
const { body, validationResult } = pkg;
const router = express.Router();

// Route 1: Get All notes using Get Method : /api/auth/getNotes
router.get("/getNotes", checkAuth, async (req, res) => {
  //Find Notes where username is same in the checkauth
  const notes = await Notes.find({ username: req.userData.user.username });
  if (!notes) {
    res.status(400).json({ error: "Notes not found" });
  }
  res.status(200).json(notes);
});
// Route 2: Post notes using Post Method : /api/auth/getNotes
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
      // Destructure req.body fields
      const { title, description, tag } = req.body;
      //Validating Error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //Create Note
      const note = new Notes({
        title,
        description,
        tag,
        username: req.userData.user.username,
      });
      //Save Note
      const saveNote = await note.save();
      res.status(200).json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
// Route 3 : Updating notes using PUT method : /api/auth/update
router.put("/update/:id", checkAuth, async (req, res) => {
  try {
    // Destructure req.body fields
    const { title, description, tag } = req.body;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Build the newNote object
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // Find the note by id
    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }

    // Ensure the user can only update their own notes
    if (note.username !== req.userData.user.username) {
      return res.status(401).json({ msg: "Unauthorized to update this note" });
    }

    // Update the note with new data
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note); // Send back the updated note
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// Route 4 : Delete existing Note Using Delete Method
router.delete("/delete/:id", checkAuth, async (req, res) => {
  try {
    //Find note as per params id
    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(400).json("Note not found");
    }
    // Ensure the user can only update their own notes
    if (note.username !== req.userData.user.username) {
      return res.status(401).json({ msg: "Unauthorized to update this note" });
    }
    //Delete the note by using its id
    note = await Notes.findByIdAndDelete(req.params.id);
    res.status(200).json("Successfully deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
