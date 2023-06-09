import React from "react";
import { Sidebar } from "../../components/Sidebar";
import { NoteWorkspace } from "../NoteWorkspace";
import { ErrorBoundary } from "../../components/ErrorBoundary";

export const TableView = () => {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar />
      <ErrorBoundary>
        <NoteWorkspace />
      </ErrorBoundary>
    </div>
  );
};
