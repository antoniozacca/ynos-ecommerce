import React, { createContext, useState, useEffect } from "react";

// Crea il contesto
export const AuthContext = createContext();

// Provider che avvolge tutta l'app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Recupera l'utente dal localStorage al primo caricamento
  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("logged_account");
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON));
    }
  }, []);

  // Funzione di login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("logged_account", JSON.stringify(userData));
  };

  // Funzione di logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("logged_account");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
