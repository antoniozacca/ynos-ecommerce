import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);       
  const [error, setError] = useState(null);           
  const { user } = useContext(AuthContext);
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
  const fetchProduct = async () => {
    setLoading(true);
    setError(null);

    // Provo a recuperare il prodotto da localStorage (custom_products)
    const localProducts = JSON.parse(localStorage.getItem('custom_products')) || [];
    const localProduct = localProducts.find(p => p.id.toString() === id.toString());

    if (localProduct) {
      // Se lo trovo localmente, lo uso direttamente
      setProduct(localProduct);
      setLoading(false);
      return;
    }

    // Altrimenti faccio fetch dall'API
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!res.ok) throw new Error(`Errore ${res.status}: ${res.statusText}`);
      const text = await res.text();
      if (!text) throw new Error("Risposta vuota dal server");
      const data = JSON.parse(text);
      setProduct(data);
    } catch (err) {
      setError(err.message);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };
  fetchProduct();
}, [id]);


  if (loading) return <p>Caricamento...</p>;
  if (error) return <p className="text-danger">Errore: {error}</p>;
  if (!product) return <p>Prodotto non trovato</p>;

  const isInCart = cart.some(item => item.id === product.id);

  return (
    <div className="row product-page">
      <div className="col-md-6 text-center">
        <img src={product.image} alt={product.title} className="img-fluid rounded" />
      </div>
      <div className="col-md-6 product-page-details">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>category: {product.category}</p>
        <p>rate: {product.rating?.rate ?? 'N/A'}</p>
        <p>count: {product.rating?.count ?? 'N/A'}</p>
        <div className="price">{product.price} €</div>

        {user ? (
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
        ) : (
          <p className="text-danger mt-3">Devi effettuare il login per aggiungere al carrello.</p>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
