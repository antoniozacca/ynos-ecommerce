import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { cart, addToCart, removeFromCart } = useCart()
  const { user } = useContext(AuthContext)

  const loadProducts = () => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(apiData => {
        const deletedProducts = JSON.parse(localStorage.getItem('deleted_products')) || []
        const customProducts = JSON.parse(localStorage.getItem('custom_products')) || []

        
        const filteredApiData = apiData.filter(p => !deletedProducts.includes(p.id.toString()))
        const filteredCustomData = customProducts.filter(p => !deletedProducts.includes(p.id.toString()))

        
        const flaggedCustoms = filteredCustomData.map(p => ({ ...p, isCustom: true }))

        // Unisci
        const allProducts = [...filteredApiData, ...flaggedCustoms]

        setProducts(allProducts)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleDeleteProduct = (id) => {
    const deletedProducts = JSON.parse(localStorage.getItem('deleted_products')) || []
    if (!deletedProducts.includes(id.toString())) {
      deletedProducts.push(id.toString())
      localStorage.setItem('deleted_products', JSON.stringify(deletedProducts))
    }

    const customProducts = JSON.parse(localStorage.getItem('custom_products')) || []
    const updatedCustomProducts = customProducts.filter(p => p.id.toString() !== id.toString())
    localStorage.setItem('custom_products', JSON.stringify(updatedCustomProducts))

    setProducts(prevProducts => prevProducts.filter(p => p.id.toString() !== id.toString()))
  }

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
            const isCustom = product.isCustom === true

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

                    <div className="d-flex flex-wrap justify-content-between gap-2 mt-auto">
                      <Link to={`/product/${product.id}`} className="btn btn-primary">
                        Vedi Dettagli
                      </Link>

                      {user && (
                        <>
                          {isInCart ? (
                            <button
                              className="btn btn-danger"
                              onClick={() => removeFromCart(product.id)}
                            >
                              Rimuovi dal carrello
                            </button>
                          ) : (
                            <button
                              className="btn btn-success"
                              onClick={() => addToCart(product)}
                            >
                              Aggiungi al carrello
                            </button>
                          )}
                        </>
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
