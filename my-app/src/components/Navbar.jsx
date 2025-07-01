import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext"; // import wishlist context
import { Link } from "react-router-dom";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart, setCart } = useCart(); // aggiungo setCart per pulire
  const { wishlist } = useWishlist();  // prendo la wishlist

  const handleLogout = () => {
    logout();
    setCart([]); // pulisce il carrello al logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">MyStore</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/registrazione">Registrati</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
            )}

            {user && (
              <>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    Carrello ({cart.length})
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/wishlist">
                    WishList ({wishlist.length})
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-product">
                    Aggiungi Prodotto
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-products">
                    I miei prodotti
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
