import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";
const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const ToAddNote = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };
  const OnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <div className="col-md-9">
        <h2>Add Notes</h2>
        <div className="mb-3">
          <input
            className="form-control"
            id="title"
            name="title"
            placeholder="Enter your Title here"
            onChange={OnChange}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            onChange={OnChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter your tag here"
          />
        </div>
        <button className="btn btn-success" onClick={ToAddNote}>
          Add Note
        </button>
      </div>
    </div>
  );
};

export default AddNote;
