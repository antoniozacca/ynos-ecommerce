import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [id])

  if (!product) return <p>Caricamento...</p>

  return (
    <div className="row product-page">
      <div className="col-md-6 text-center">
        <img src={product.image} alt={product.title} className="img-fluid rounded" />
      </div>
      <div className="col-md-6 product-page-details">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <div className="price">{product.price} €</div>
        <button className="btn btn-primary mt-3" onClick={() => addToCart(product)}>
          Aggiungi al Carrello
        </button>
      </div>
    </div>
  )
}

export default ProductPage
