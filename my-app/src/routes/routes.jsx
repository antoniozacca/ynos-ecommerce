import Home from '../pages/Home'
import ProductPage from '../pages/ProductPage'
import CartPage from '../pages/CartPage'
import Registrazione from '../pages/Registrazione';


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
  },
  {
    path: '/registrazione',
    element: <Registrazione />
  }
]

export default routes
