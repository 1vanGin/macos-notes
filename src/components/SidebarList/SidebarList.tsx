import "./SidebarList.css";
import React from "react";
import { SidebarListItem } from "../SidebarListItem";
import { useFirebaseDB } from "../../hooks/useFirebaseDB";
import { Box, CircularProgress } from "@mui/material";
import { useSearchableNotes } from "../../hooks/useSearcheableNotes";

export const SidebarList = () => {
  const { notes, loading } = useFirebaseDB();
  const { searchableNotes } = useSearchableNotes(notes);

  if (loading) {
    return (
      <Box sx={{ display: "flex", textAlign: "center", margin: "20px auto" }}>
        <CircularProgress />
      </Box>
    );
  }

  if ((notes?.length === 0 && !loading) || notes === null) {
    return <div className="sidebar__is-empty">Нет заметок</div>;
  }

  return (
    <ul className="sidebar__list">
      {searchableNotes.map((note) => (
        <SidebarListItem key={note.id} item={note} />
      ))}
    </ul>
  );
};
