import Home from '../pages/Home';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import Registrazione from '../pages/Registrazione';
import Login from '../pages/Login';
import PrivateRoute from '../components/PrivateRoute';
import Logout from '../pages/Logout';

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
    element: (
      <PrivateRoute>
        <CartPage />
      </PrivateRoute>
    )
  },
  {
    path: '/registrazione',
    element: <Registrazione />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/logout',
    element: <Logout />
  }
]

export default routes;
