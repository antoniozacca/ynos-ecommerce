import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("logged_account");
    alert("Logout effettuato con successo!");
    navigate("/login"); // oppure alla home se preferisci
  }, [navigate]);

  return null; // Nessun UI, è solo per eseguire logout
};

export default Logout;
