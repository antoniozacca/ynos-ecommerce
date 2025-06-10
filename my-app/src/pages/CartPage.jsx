import { useCart } from '../context/CartContext'

function CartPage() {
  const { cart, removeFromCart } = useCart()

  const total = cart.reduce((acc, item) => acc + item.price, 0)

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
              {cart.map(item => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image} alt={item.title} width="50" className="me-2" />
                    {item.title}
                  </td>
                  <td>{item.price} €</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                      Rimuovi
                    </button>
                  </td>
                </tr>
              ))}
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
