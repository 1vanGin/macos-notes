import "./CardsView.css";
import React from "react";
import { CardsList } from "../../components/CardsList";
import { ErrorBoundary } from "../../components/ErrorBoundary";

export const CardsView = () => {
  return (
    <div className="cards">
      <ErrorBoundary>
        <CardsList />
      </ErrorBoundary>
    </div>
  );
};
