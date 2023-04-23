import { useCallback, useEffect, useState } from "react";
import { onValue, ref, set } from "firebase/database";
import { db } from "../utils/firebase";
import { INotesDB, INotesItem } from "../interfaces";

export const useFirebaseDB = (): INotesDB => {
  const [notes, setNotes] = useState<INotesItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dbRef = ref(db, "notes");

  const addNote = useCallback((value: string) => {
    setLoading(true);
    const oldNotes = notes !== null ? notes : [];
    const title = value
      .split("\n")[0]
      .replace(/[^a-zа-яё0-9\s]/gi, " ")
      .trim();
    const params: INotesItem = {
      id: new Date().getTime(),
      text: value,
      time: new Date().getTime(),
      title,
    };

    set(dbRef, [...oldNotes, params]).then(() => {
      setLoading(false);
      updateLocalNotes();
    });
  }, []);

  const deleteNote = useCallback((id: number) => {
    setLoading(true);
    const updatedNotes: INotesItem[] = notes.filter((item) => item.id !== id);
    set(dbRef, [...updatedNotes]).then(() => {
      setLoading(false);
      updateLocalNotes();
    });
  }, []);

  const updateNote = useCallback((id: number, text: string) => {
    setLoading(true);
    const updatedNotes: INotesItem[] = notes.map((item) => {
      if (item.id === id) {
        const title = text
          .split("\n")[0]
          .replace(/[^a-zа-яё0-9\s]/gi, " ")
          .trim();
        return {
          id: item.id,
          text: text,
          time: item.time,
          title,
        };
      } else {
        return item;
      }
    });

    set(dbRef, [...updatedNotes]).then(() => {
      setLoading(false);
      updateLocalNotes();
    });
  }, []);

  const updateLocalNotes = useCallback(() => {
    setLoading(true);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setNotes(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    updateLocalNotes();
  }, []);

  return {
    loading,
    notes,
    addNote,
    deleteNote,
    updateNote,
  };
};
