import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes } = context;

  return (
    <div className="container my-3">
      <h5 className="mb-3">Your Notes</h5>
      <div className="row g-4">
        {" "}
        {/* Added g-4 for gutter spacing */}
        {notes.map((note) => (
          <div className="col-md-6" key={note._id}>
            {" "}
            {/* Adjusted width to show two notes per row */}
            <NoteItem note={note} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
