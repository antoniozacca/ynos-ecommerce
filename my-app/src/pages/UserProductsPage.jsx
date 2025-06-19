import { useEffect, useState } from 'react';

const UserProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('custom_products');
    if (saved) {
      setProducts(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (id) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('custom_products', JSON.stringify(updated));
  };

  if (products.length === 0) {
    return <div className="container mt-4"><h4>Nessun prodotto creato</h4></div>;
  }

  return (
    <div className="container mt-4">
      <h2>I miei prodotti</h2>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={product.image} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><strong>{product.price} €</strong></p>
                <button onClick={() => handleDelete(product.id)} className="btn btn-danger w-100">Rimuovi</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProducts;
