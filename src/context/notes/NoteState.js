import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "6717b0b0b436df26e72cb1ed",
      username: "Dhannu",
      title: "HouseOfTheDragon",
      description: "GameOfThrones series",
      tag: "awesome",
      date: "2024-10-22T14:03:28.387Z",
      __v: 0,
    },
  ];
  const [notes, setnotes] = useState(notesInitial);
  return (
    <NoteContext.Provider value={{ notes, setnotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
