import React from "react";
import Notes from "./Notes";

export const Home = () => {
  return (
    <>
      <div className="container">
        <div></div>
        <h3>Your Notes</h3>
        <div>
          <Notes />
        </div>
      </div>
    </>
  );
};
