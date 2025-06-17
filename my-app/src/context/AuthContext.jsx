import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("logged_account");
    if (loggedUserJSON) setUser(JSON.parse(loggedUserJSON));
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("logged_account", JSON.stringify(userData));
  };

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
