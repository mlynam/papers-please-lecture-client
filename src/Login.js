import React, { useContext, useState } from "react";
import { AuthenticationContext } from "./AuthenticationProvider";

export default function Login({ children }) {
  const [nameInput, setNameInput] = useState("");
  const { isAuthenticated, name, age, login, logout } = useContext(
    AuthenticationContext
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(nameInput);
    } catch (e) {
      alert(e.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <form onSubmit={handleLogin}>
        <label>
          Name
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </label>
        <button type="submit">login</button>
      </form>
    );
  }

  return (
    <>
      <div>
        {name}: {age}
      </div>
      <button onClick={logout}>logout</button>
      {children}
    </>
  );
}
