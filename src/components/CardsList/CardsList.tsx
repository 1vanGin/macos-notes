import "./CardsList.css";
import React from "react";
import { CardsListItem } from "../CardsListItem";
import { useFirebaseDB } from "../../hooks/useFirebaseDB";
import { Box, CircularProgress } from "@mui/material";

export const CardsList = () => {
  const { notes, loading } = useFirebaseDB();

  if (loading) {
    return (
      <Box sx={{ display: "flex", textAlign: "center", margin: "20px auto" }}>
        <CircularProgress />
      </Box>
    );
  }

  if ((notes?.length === 0 && !loading) || notes === null) {
    return <div className="cards__is-empty">Нет заметок</div>;
  }

  return (
    <div className="cards__list">
      {notes.map((note) => (
        <CardsListItem key={note.id} item={note} />
      ))}
    </div>
  );
};
