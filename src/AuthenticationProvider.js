import React, { useState } from "react";
import { storage } from "./services/storage";
import { server } from "./util/server";

const defaultAuthState = {
  isAuthenticated: false,
  name: null,
  age: null,
};

function initAuthState() {
  return storage.get("auth") || defaultAuthState;
}

function initDefaultContext(state) {
  return {
    login: () => {},
    logout: () => {},
    ...state,
  };
}

const defaultContext = initDefaultContext(initAuthState());

export const AuthenticationContext = React.createContext(defaultContext);

export default function AuthenticationProvider({ children }) {
  const [state, setState] = useState(initAuthState());

  const login = async (name) => {
    if (!name) {
      throw new Error("You must provide a name");
    }

    const response = await fetch(server.baseUrl() + "/identity", {
      headers: {
        Name: name,
      },
    });

    if (response.ok) {
      const { age } = await response.json();
      const newState = {
        isAuthenticated: true,
        age,
        name,
      };

      storage.set("auth", newState);
      setState(newState);
    } else {
      setState(defaultAuthState);
      throw new Error("Failed to login");
    }
  };

  const logout = () => {
    storage.set("auth", defaultAuthState);
    setState(defaultAuthState);
  };

  return (
    <AuthenticationContext.Provider value={{ login, logout, ...state }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
