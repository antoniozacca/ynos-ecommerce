import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });

  const [errore, setErrore] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const { title, price, description, category, image } = formData;
  if (!title || !price || !description || !category || !image) {
    setErrore('Tutti i campi sono obbligatori');
    return;
  }

  //customProducts leggendo da localStorage
  const customProducts = JSON.parse(localStorage.getItem('custom_products')) || [];

  const newProduct = {
    id: Date.now(),
    title,
    price: parseFloat(price),
    description,
    category,
    image,
    rating: {
      rate: 0,
      count: 0
    }
  };

  localStorage.setItem('custom_products', JSON.stringify([...customProducts, newProduct]));

  alert('Prodotto aggiunto con successo!');
  navigate('/');
};


  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">Aggiungi Nuovo Prodotto</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
        {['title', 'price', 'description', 'category', 'image'].map((field, i) => (
          <div className="mb-3" key={i}>
            <label htmlFor={field} className="form-label text-capitalize">{field}</label>
            <input
              type={field === 'price' ? 'number' : 'text'}
              className="form-control"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        {errore && <div className="alert alert-danger">{errore}</div>}

        <button type="submit" className="btn btn-primary w-100">Aggiungi</button>
      </form>
    </div>
  );
};

export default AddProduct;
