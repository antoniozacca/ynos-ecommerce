import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import routes from "./routes/routes";
import { AuthProvider } from "./context/AuthContext"; // importa il provider

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          {routes.map(({ path, element }, i) => (
            <Route key={i} path={path} element={element} />
          ))}
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
