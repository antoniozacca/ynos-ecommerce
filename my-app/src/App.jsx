import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import routes from "./routes/routes";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import PrivateRoute from "./components/PrivateRoute"; // il percorso esatto dipende da dove metti PrivateRoute

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            {routes.map(({ path, element }, i) => {
              // rotte private
              if (path === "/cart") {
                return (
                  <Route
                    key={i}
                    path={path}
                    element={<PrivateRoute>{element}</PrivateRoute>}
                  />
                );
              }
              // Rotte pubbliche
              return <Route key={i} path={path} element={element} />;
            })}
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
