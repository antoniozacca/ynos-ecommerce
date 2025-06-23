import Home from '../pages/Home';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import Registrazione from '../pages/Registrazione';
import Login from '../pages/Login';
import PrivateRoute from '../components/PrivateRoute';
import Logout from '../pages/Logout';
import AddProduct from '../pages/AddProduct';
import UserProductsPage from "../pages/UserProductsPage";

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
  },
  {
    path: '/add-product',
    element: (
      <PrivateRoute>
        <AddProduct />
      </PrivateRoute>
  )
  },
  { 
    path: "/my-products",
    element: (
    <PrivateRoute>
      <UserProductsPage />
    </PrivateRoute> 
      )
  },
]

export default routes;
