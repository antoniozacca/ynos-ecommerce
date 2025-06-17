import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errore, setErrore] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prendo dal localStorage i dati dell'utente con la key basata sulla email
    const utenteSalvato = localStorage.getItem(`utente_${formData.email}`);

    if (!utenteSalvato) {
      setErrore("Email non registrata.");
      return;
    }

    const utente = JSON.parse(utenteSalvato);

    if (utente.password !== formData.password) {
      setErrore("Password errata.");
      return;
    }

    // Se tutto ok, salvo nel localStorage come logged account
    localStorage.setItem("logged_account", utenteSalvato);

    setErrore("");
    alert("Login effettuato con successo!");
    // Qui puoi anche reindirizzare o fare altro
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Inserisci la tua email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Inserisci la tua password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {errore && <div className="alert alert-danger">{errore}</div>}

        <button type="submit" className="btn btn-primary w-100">Accedi</button>
      </form>
    </div>
  );
};

export default Login;
