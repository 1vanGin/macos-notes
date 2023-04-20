import "./App.css";
import React from "react";
import { AuthProvider } from "./context/AuthProvider";
import { RedirectRouter } from "./containers/RedirectRouter";

function App(): JSX.Element {
  return (
    <AuthProvider>
      <RedirectRouter />
    </AuthProvider>
  );
}

export default App;
