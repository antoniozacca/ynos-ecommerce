import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useWishlist } from '../context/WishlistContext'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { cart, addToCart, removeFromCart } = useCart()
  const { user } = useContext(AuthContext)
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const [searchName, setSearchName] = useState('')
  const [searchCategory, setSearchCategory] = useState('')
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)

  const loadProducts = () => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(apiData => {
        const deletedProducts = JSON.parse(localStorage.getItem('deleted_products')) || []
        const customProducts = JSON.parse(localStorage.getItem('custom_products')) || []

        const filteredApiData = apiData.filter(p => !deletedProducts.includes(p.id.toString()))
        const customProductsWithFlag = customProducts.map(p => ({ ...p, isCustom: true }))

        const allProducts = [...filteredApiData, ...customProductsWithFlag]

        setProducts(allProducts)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const filteredProducts = products.filter(product => {
    const nameMatch = product.title.toLowerCase().includes(searchName.toLowerCase())
    const categoryMatch = product.category.toLowerCase().includes(searchCategory.toLowerCase())
    return nameMatch && categoryMatch
  })

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
    <div className="container my-5">
      <h1 className="shop-title">Shop</h1>

      <div className="accordion mb-4 accordion-custom">
        <div className="accordion-item border-0">
          <h2 className="accordion-header" id="headingOne">
            <button
              type="button"
              className={`accordion-button d-flex justify-content-between align-items-center ${
                !isAccordionOpen ? 'collapsed' : ''
              } accordion-button-custom`}
              onClick={() => setIsAccordionOpen(prev => !prev)}
              aria-expanded={isAccordionOpen}
              aria-controls="filterCollapse"
            >
              Filtra Prodotti
              <span
                className={`accordion-arrow ${isAccordionOpen ? 'open' : ''}`}
                aria-hidden="true"
              >
                ▶
              </span>
            </button>
          </h2>

          <div
            id="filterCollapse"
            className={`accordion-collapse collapse ${isAccordionOpen ? 'show' : ''}`}
            aria-labelledby="headingOne"
          >
            <div className="accordion-body accordion-body-custom">
              <div className="mb-4">
                <label className="form-label fw-semibold" htmlFor="filterName">
                  Filtra per nome
                </label>
                <input
                  id="filterName"
                  type="text"
                  className="form-control input-custom"
                  placeholder="Cerca per nome..."
                  value={searchName}
                  onChange={e => setSearchName(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label fw-semibold" htmlFor="filterCategory">
                  Filtra per categoria
                </label>
                <input
                  id="filterCategory"
                  type="text"
                  className="form-control input-custom"
                  placeholder="Cerca per categoria..."
                  value={searchCategory}
                  onChange={e => setSearchCategory(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border spinner-custom" role="status"></div>
        </div>
      ) : (
        <div className="row g-4">
          {filteredProducts.map(product => {
            const isInCart = cart.some(item => item.id === product.id)
            const isCustom = product.isCustom === true
            const isInWishlist = wishlist.some(item => item.id === product.id)

            return (
              <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
                <div
                  className="card h-100 card-custom"
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <img
                    src={product.image}
                    className="card-img-top card-img-custom"
                    alt={product.title}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-semibold card-title-custom">
                      {product.title.length > 45
                        ? product.title.slice(0, 42) + '...'
                        : product.title}
                    </h5>
                    <p className="card-text fs-5 fw-bold mb-3">{product.price} €</p>

                    <div className="mt-auto d-flex flex-wrap gap-2 justify-content-center">
                      <Link to={`/product/${product.id}`} className="btn btn-outline-primary flex-grow-1">
                        Vedi Dettagli
                      </Link>

                      {user && (
                        <>
                          {isInCart ? (
                            <button
                              className="btn btn-danger flex-grow-1"
                              onClick={() => removeFromCart(product.id)}
                            >
                              Rimuovi
                            </button>
                          ) : (
                            <button
                              className="btn btn-success flex-grow-1"
                              onClick={() => addToCart(product)}
                            >
                              Aggiungi
                            </button>
                          )}

                          <button
                            className={isInWishlist ? "btn btn-danger flex-grow-1" : "btn btn-outline-danger flex-grow-1"}
                            onClick={() => {
                              if (isInWishlist) {
                                removeFromWishlist(product.id)
                              } else {
                                addToWishlist(product)
                              }
                            }}
                          >
                            {isInWishlist ? '💖 Rimuovi dai preferiti' : '🤍 Aggiungi ai preferiti'}
                          </button>
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
