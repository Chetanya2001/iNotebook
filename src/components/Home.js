import React from "react";

import Notes from "./Notes";

export const Home = () => {
  return (
    <>
      <div className="col-md-9">
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
        <div>
          <Notes />
        </div>
      </div>
    </>
  );
};
