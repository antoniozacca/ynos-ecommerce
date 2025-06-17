import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user } = useContext(AuthContext);  // <-- prendo utente loggato
  const { cart, addToCart, removeFromCart } = useCart()

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>Caricamento...</p>;
  const isInCart = cart.some(item => item.id === product.id)
  return (
    <div className="row product-page">
      <div className="col-md-6 text-center">
        <img src={product.image} alt={product.title} className="img-fluid rounded" />
      </div>
      <div className="col-md-6 product-page-details">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>category: {product.category}</p>
        <p>rate: {product.rating.rate}</p>
        <p>count: {product.rating.count}</p>
        <div className="price">{product.price} €</div>
        
        {user && (
                        isInCart ? (
                          <button
                            className="btn btn-danger"
                            onClick={() => removeFromCart(product.id)}
                          >
                            Rimuovi
                          </button>
                        ) : (
                          <button
                            className="btn btn-success"
                            onClick={() => addToCart(product)}
                          >
                            Aggiungi al carrello
                          </button>
                        )
                      )}
        {!user && <p className="text-danger mt-3">Devi effettuare il login per aggiungere al carrello.</p>}
      </div>
    </div>
  );
}

export default ProductPage;
