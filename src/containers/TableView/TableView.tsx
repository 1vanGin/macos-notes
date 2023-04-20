import React from "react";
import { Sidebar } from "../../components/Sidebar";
import { NoteWorkspace } from "../NoteWorkspace";

export const TableView = () => {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar />
      <NoteWorkspace />
    </div>
  );
};
