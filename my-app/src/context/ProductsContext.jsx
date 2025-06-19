import React, { createContext, useState, useEffect } from "react";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [apiProducts, setApiProducts] = useState([]);
  const [customProducts, setCustomProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Carica da localStorage (se vuoi persistente)
  useEffect(() => {
    const savedCustom = JSON.parse(localStorage.getItem("customProducts")) || [];
    setCustomProducts(savedCustom);
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setApiProducts(data);
        setLoadingProducts(false);
      })
      .catch(() => setLoadingProducts(false));
  }, []);

  // Aggiorna localStorage quando cambia customProducts
  useEffect(() => {
    localStorage.setItem("customProducts", JSON.stringify(customProducts));
  }, [customProducts]);

  const addProduct = (newProduct) => {
    newProduct.id = Date.now(); // ID finto
    newProduct.isCustom = true; // Etichetta come "custom"
    setCustomProducts((prev) => [...prev, newProduct]);
  };

  const deleteProduct = (id) => {
    setCustomProducts((prev) => prev.filter((prod) => prod.id !== id));
  };

  const allProducts = [...apiProducts, ...customProducts];

  return (
    <ProductsContext.Provider
      value={{ products: allProducts, loadingProducts, addProduct, deleteProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
