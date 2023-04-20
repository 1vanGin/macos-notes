import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../../pages/Login";
import { Header } from "../Header";
import { CardsView } from "../CardsView";
import { TableView } from "../TableView";
import { Links } from "../../enums";
import { NotFound } from "../../pages/NotFound";

export const RedirectRouter = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<TableView />} />
        <Route path={`${Links.tableLink}/:id`} element={<TableView />} />
        <Route path={`${Links.cardsLink}`} element={<CardsView />} />
        <Route path={`${Links.loginLink}`} element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
