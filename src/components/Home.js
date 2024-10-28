import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

export const Home = () => {
  const context = useContext(noteContext);
  const { notes, setnotes } = context;
  return (
    <>
      <div className="container">
        <h2>Add Notes</h2>
        <div className="mb-3">
          <input
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter your Title here"
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter your tag here"
          />
        </div>
        <button className="btn btn-success">Add Note</button>
        <h3>Your Notes</h3>
        <p>
          {notes.map((note) => {
            return note.title;
          })}
        </p>
      </div>
    </>
  );
};
