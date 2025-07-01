import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext' // Importa wishlist context

function CartPage() {
  const { cart, removeFromCart } = useCart()
  const { wishlist, addToWishlist } = useWishlist()

  const total = cart.reduce((acc, item) => acc + item.price, 0)

  const handleMoveToWishlist = (product) => {
    removeFromCart(product.id)
    if (!wishlist.some(item => item.id === product.id)) {
      addToWishlist(product)
    }
  }

  return (
    <div className="cart-page">
      <h1>Carrello</h1>
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
          <div className="total">
            Totale: <strong>{total.toFixed(2)} €</strong>
          </div>
        </>
      )}
    </div>
  )
}

export default CartPage
