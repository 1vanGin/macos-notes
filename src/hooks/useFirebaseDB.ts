import { useEffect, useState } from "react";
import { onValue, ref, set } from "firebase/database";
import { db } from "../utils/firebase";
import { INotesDB, INotesItem } from "../interfaces";

export const useFirebaseDB = (): INotesDB => {
  const [notes, setNotes] = useState<INotesItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const addNote = (value: string) => {
    setLoading(true);
    const oldNotes = notes !== null ? notes : [];
    const title = value
      .split("\n")[0]
      .replace(/[^a-zа-яё0-9\s]/gi, " ")
      .trim();
    const params: INotesItem = {
      id: new Date().getTime(),
      time: new Date().getTime(),
      text: value,
      title,
    };
    const dbRef = ref(db, "notes");
    set(dbRef, [...oldNotes, params]).then(() => {
      setLoading(false);
      updateLocalNotes();
    });
  };

  const deleteNote = (id: number) => {
    setLoading(true);
    const updatedNotes: INotesItem[] = notes.filter((item) => item.id !== id);
    const dbRef = ref(db, "notes");
    set(dbRef, [...updatedNotes]).then(() => {
      setLoading(false);
      updateLocalNotes();
    });
  };

  const updateLocalNotes = () => {
    const dbRef = ref(db, "notes");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setNotes(data);
    });
  };

  useEffect(() => {
    setLoading(true);
    updateLocalNotes();
    setLoading(false);
  }, []);

  return {
    loading,
    notes,
    addNote,
    deleteNote,
  };
};
