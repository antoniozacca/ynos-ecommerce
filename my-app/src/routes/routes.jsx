import Home from '../pages/Home'
import ProductPage from '../pages/ProductPage'
import CartPage from '../pages/CartPage'

const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/product/:id',
    element: <ProductPage />
  },
  {
    path: '/cart',
    element: <CartPage />
  }
]

export default routes
