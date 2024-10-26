import React, { useEffect } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/NoteContext";
const About = () => {
  const data = useContext(noteContext);
  useEffect(() => {
    data.update();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <h1>
        My name is {data.state.name} and I am studying in {data.state.college}
      </h1>
    </>
  );
};

export default About;
