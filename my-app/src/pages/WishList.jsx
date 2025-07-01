import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { WishlistContext } from '../context/WishlistContext'

function WishList() {
  const { addToCart } = useContext(CartContext)
  const { wishlist, removeFromWishlist } = useContext(WishlistContext)

  return (
    <div className="container mt-5">
      <h2 className="mb-4">La tua Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>La tua lista dei desideri è vuota.</p>
      ) : (
        <div className="row">
          {wishlist.map(product => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card h-100 shadow-sm">
                <img src={product.image} className="card-img-top" alt={product.title} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.price} €</p>

                  <div className="mt-auto d-flex gap-2">
                    <button
                      className="btn btn-success w-50"
                      onClick={() => addToCart(product)}
                    >
                      Aggiungi al carrello
                    </button>
                    <button
                      className="btn btn-danger w-50"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      Rimuovi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default WishList
