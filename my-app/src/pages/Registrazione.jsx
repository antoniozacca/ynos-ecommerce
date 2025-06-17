import React, { useState } from "react";

const Registrazione = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
    confermaPassword: "",
  });

  const [errore, setErrore] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confermaPassword) {
      setErrore("Le password non corrispondono.");
      return;
    }

    const nuovoUtente = {
      nome: formData.nome,
      cognome: formData.cognome,
      email: formData.email,
      password: formData.password,
    };

    localStorage.setItem(`utente_${nuovoUtente.email}`, JSON.stringify(nuovoUtente));

    setErrore("");
    alert("Registrazione completata!");

    setFormData({
      nome: "",
      cognome: "",
      email: "",
      password: "",
      confermaPassword: "",
    });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Registrazione</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            placeholder="Inserisci il nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cognome" className="form-label">Cognome</label>
          <input
            type="text"
            className="form-control"
            id="cognome"
            name="cognome"
            placeholder="Inserisci il cognome"
            value={formData.cognome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="nome@esempio.com"
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
            placeholder="Inserisci una password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confermaPassword" className="form-label">Conferma Password</label>
          <input
            type="password"
            className="form-control"
            id="confermaPassword"
            name="confermaPassword"
            placeholder="Conferma la password"
            value={formData.confermaPassword}
            onChange={handleChange}
            required
          />
        </div>

        {errore && <div className="alert alert-danger">{errore}</div>}

        <button type="submit" className="btn btn-primary w-100">
          Registrati
        </button>
      </form>
    </div>
  );
};

export default Registrazione;
