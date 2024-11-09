// NoteItem.js
import React from "react";
import noteContext from "../context/notes/NoteContext";
import { useContext } from "react";

const NoteItem = ({ note }) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  // Inline style objects
  const cardStyle = {
    padding: "15px",
    fontFamily: "Arial, sans-serif",
  };

  const titleStyle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
  };

  const textStyle = {
    fontSize: "1rem",
    color: "#555",
  };

  return (
    <div className="note-item" style={cardStyle}>
      <h5 className="card-title" style={titleStyle}>
        {note.title}
      </h5>
      <p className="card-text" style={textStyle}>
        {note.description}
      </p>
      <button className="btn btn-success">Update</button>
      &nbsp;
      <button
        className="btn btn-danger"
        onClick={() => {
          deleteNote(note._id);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default NoteItem;
