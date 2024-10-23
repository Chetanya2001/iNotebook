import mongoose from "mongoose";
import { Schema } from "mongoose";
//Create Structure of Notes table
const NotesSchema = new Schema({
  username: {
    type: String,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("Notes", NotesSchema);
