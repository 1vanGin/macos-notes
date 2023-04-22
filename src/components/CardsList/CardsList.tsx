import "./CardsList.css";
import React from "react";
import { CardsListItem } from "../CardsListItem";
import { Box, CircularProgress } from "@mui/material";
import { useSearchableNotes } from "../../hooks/useSearcheableNotes";
import { useFirebaseDB } from "../../hooks/useFirebaseDB";

export const CardsList = () => {
  const { notes, loading } = useFirebaseDB();
  const { searchableNotes } = useSearchableNotes(notes);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          margin: "20px auto",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if ((notes?.length === 0 && !loading) || notes === null) {
    return <div className="cards__is-empty">Нет заметок</div>;
  }

  return (
    <div className="cards__list">
      {searchableNotes.map((note) => (
        <CardsListItem key={note.id} item={note} />
      ))}
    </div>
  );
};
