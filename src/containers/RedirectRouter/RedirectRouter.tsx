import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../../pages/Login";
import { Header } from "../Header";
import { CardsView } from "../CardsView";
import { TableView } from "../TableView";
import { Links } from "../../enums";
import { NotFound } from "../../pages/NotFound";
import { PrivateRoute } from "../../components/PrivateRoute";

export const RedirectRouter = () => {
  return (
    <div className="App">
      <>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <TableView />
              </PrivateRoute>
            }
          />
          <Route
            path={`${Links.tableLink}/:id`}
            element={
              <PrivateRoute>
                <TableView />
              </PrivateRoute>
            }
          />
          <Route
            path={`${Links.cardsLink}`}
            element={
              <PrivateRoute>
                <CardsView />
              </PrivateRoute>
            }
          />
          <Route path={`${Links.loginLink}`} element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </div>
  );
};
