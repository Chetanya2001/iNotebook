import React from "react";

export const Home = () => {
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
      </div>
    </>
  );
};
