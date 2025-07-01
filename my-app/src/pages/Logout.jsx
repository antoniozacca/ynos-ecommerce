import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("logged_account");
    alert("Logout effettuato con successo!");
    navigate("/login");
  }, [navigate]);

  return null; //per eseguire logout
};

export default Logout;