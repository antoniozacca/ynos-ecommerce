import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext"; // <-- Importa il context del tema
import { Link } from "react-router-dom";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart, setCart } = useCart();
  const { wishlist } = useWishlist();
  const { theme, toggleTheme } = useTheme(); // <-- Usa lo switch del tema

  const handleLogout = () => {
    logout();
    setCart([]);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">MyStore</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/registrazione">Registrati</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">Carrello ({cart.length})</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/wishlist">WishList ({wishlist.length})</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-product">Aggiungi Prodotto</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-products">I miei prodotti</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}

            {/* Tema Light/Dark visibile a tutti */}
            <li className="nav-item ms-3">
              <button className="btn btn-outline-light btn-sm" onClick={toggleTheme}>
                {theme === 'light' ? '🌙 Tema scuro' : '☀️ Tema chiaro'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
