import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const loggedIn = localStorage.getItem("logged_account");
  return loggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
