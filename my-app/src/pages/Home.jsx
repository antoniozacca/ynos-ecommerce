import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div>
      <h1 className="text-center mb-4">Prodotti</h1>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow product-card">
              <img src={product.image} className="card-img-top p-3" alt={product.title} />
              <div className="card-body product-card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.price} €</p>
                <Link to={`/product/${product.id}`} className="btn btn-primary mt-auto">
                  Vedi Dettagli
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
