import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { INotesItem } from "../interfaces";

export const useSearchableNotes = (notes: INotesItem[]) => {
  const [searchParams] = useSearchParams();
  const [searchableNotes, setSearchableNotes] = useState<INotesItem[]>(notes);

  useEffect(() => {
    const searchText: string | null = searchParams.get("search");
    if (searchText !== null) {
      const searchableNotes: INotesItem[] = notes.filter((note) => {
        if (note.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
          return note;
        }
      });
      setSearchableNotes(searchableNotes);
    } else {
      setSearchableNotes(notes);
    }
  }, [searchParams, notes]);

  return { searchableNotes };
};
