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
    {
      _id: "6717b0b0b436df26e72cb1ef",
      username: "Dhannu",
      title: "HouseOfTheDragon",
      description: "GameOfThrones series",
      tag: "awesome",
      date: "2024-10-22T14:03:28.387Z",
      __v: 0,
    },
  ];
  //ADD notes

  const [notes, setNotes] = useState(notesInitial);
  const addNote = (title, description, tag) => {
    const note = {
      _id: "6717b0b0b436df26e72cb1ec",
      username: "Dhannu",
      title: title,
      description: description,
      tag: tag,
      date: "2024-10-22T14:03:28.387Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  // Delete Note
  const deleteNote = () => {};
  //Edit Note
  const EditNote = () => {};
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, EditNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
