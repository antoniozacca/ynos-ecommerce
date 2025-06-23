import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const loggedIn = localStorage.getItem("logged_account");
  const location = useLocation();

  return loggedIn ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
