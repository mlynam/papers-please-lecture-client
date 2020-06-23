import React from "react";
import "./App.css";
import AuthenticationProvider from "./AuthenticationProvider";
import AppBar from "./AppBar";
import Login from "./Login";

function App() {
  return (
    <AuthenticationProvider>
      <AppBar />
      <Login>
        <h1>Logged in!</h1>
      </Login>
    </AuthenticationProvider>
  );
}

export default App;
