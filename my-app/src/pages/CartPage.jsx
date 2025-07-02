import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useState } from 'react'

function CartPage() {
  const { cart, removeFromCart, addToCart } = useCart()
  const { wishlist, addToWishlist } = useWishlist()
  const [savedForLater, setSavedForLater] = useState([])

  const total = cart.reduce((acc, item) => acc + item.price, 0)

  const handleMoveToWishlist = (product) => {
    removeFromCart(product.id)
    if (!wishlist.some(item => item.id === product.id)) {
      addToWishlist(product)
    }
  }

  const handleSaveForLater = (product) => {
    removeFromCart(product.id)
    setSavedForLater(prev => [...prev, product])
  }

  const handleMoveToCart = (product) => {
    setSavedForLater(prev => prev.filter(item => item.id !== product.id))
    addToCart(product)
  }

  const handleRemoveFromSaved = (productId) => {
    setSavedForLater(prev => prev.filter(item => item.id !== productId))
  }

  return (
    <div className="cart-page">
      <h1>Carrello</h1>

      {/* Carrello attivo */}
      {cart.length === 0 ? (
        <p>Il carrello è vuoto</p>
      ) : (
        <>
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Prodotto</th>
                <th>Prezzo</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => {
                const isInWishlist = wishlist.some(w => w.id === item.id)
                return (
                  <tr key={item.id}>
                    <td>
                      <img src={item.image} alt={item.title} width="50" className="me-2" />
                      {item.title}
                    </td>
                    <td>{item.price} €</td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm me-2"
                        onClick={() => handleMoveToWishlist(item)}
                        disabled={isInWishlist}
                        title={isInWishlist ? "Già nei preferiti" : "Sposta nei preferiti"}
                      >
                        🤍
                      </button>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleSaveForLater(item)}
                      >
                        Salva per dopo
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Rimuovi
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="total mb-4">
            Totale: <strong>{total.toFixed(2)} €</strong>
          </div>
        </>
      )}

      {/* Salva per dopo */}
      {savedForLater.length > 0 && (
        <>
          <h2 className="mt-5">Salvati per dopo</h2>
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Prodotto</th>
                <th>Prezzo</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {savedForLater.map(item => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image} alt={item.title} width="50" className="me-2" />
                    {item.title}
                  </td>
                  <td>{item.price} €</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleMoveToCart(item)}
                    >
                      Sposta nel carrello
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveFromSaved(item.id)}
                    >
                      Rimuovi
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}

export default CartPage
