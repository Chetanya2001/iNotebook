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
        {/* Added g-4 for gutter spacing */}
        {notes.map((note) => (
          <div className="col-md-4 col-lg-3" key={note._id}>
            {/* col-md-4 will show 3 notes per row on medium screens, col-lg-3 will show 4 on large */}
            <div className="card shadow-sm">
              {/* Card for each note */}
              <div className="card-body">
                {/* Card Body for content */}
                <NoteItem note={note} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
