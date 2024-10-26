import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const s1 = { name: "Chetanya", college: "IITM" };
  const [state, setState] = useState(s1);
  const update = () => {
    setTimeout(() => {
      setState({
        college: "Indian Institute of Technology, Madras",
      });
    }, 2000);
  };
  return (
    <NoteContext.Provider value={{ state, update }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
