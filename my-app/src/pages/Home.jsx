import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { cart, addToCart, removeFromCart } = useCart() 

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <h1 className="text-center mb-4">Shop</h1>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <div className="row">
          {products.map(product => {
            const isInCart = cart.some(item => item.id === product.id)

            return (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow product-card">
                  <img
                    src={product.image}
                    className="card-img-top p-3 product-image"
                    alt={product.title}
                  />
                  <div className="card-body product-card-body d-flex flex-column">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.price} €</p>
                    
                    <div className="d-flex justify-content-between gap-2 mt-auto">
                      <Link to={`/product/${product.id}`} className="btn btn-primary">
                        Vedi Dettagli
                      </Link>

                      {isInCart ? (
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
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Home
