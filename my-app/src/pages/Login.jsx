import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Email non valida')
      .required('Campo obbligatorio'),
    password: Yup.string()
      .required('Campo obbligatorio')
      .min(8, 'Minimo 8 caratteri')
      .matches(/[A-Z]/, 'Deve contenere una lettera maiuscola')
      .matches(/\d/, 'Deve contenere un numero')
      .matches(/[@$!%*?&]/, 'Deve contenere un carattere speciale')
  });

  const handleSubmit = (values) => {
    // Recupero gli utenti salvati (può essere anche un array)
    const savedUser = JSON.parse(localStorage.getItem('user'));

    if (
      savedUser &&
      savedUser.email === values.email &&
      savedUser.password === values.password
    ) {
      login(savedUser);
      alert('Login effettuato!');
      navigate('/');
    } else {
      alert('Credenziali non valide');
    }
  };

  return (
  <div className="container mt-5 d-flex justify-content-center">
    <div className="card shadow-sm p-4" style={{ maxWidth: '400px', width: '100%' }}>
      <h2 className="text-center mb-4">Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              className="form-control"
              placeholder="Inserisci la tua email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="form-text text-danger"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">Password</label>
            <Field
              id="password"
              name="password"
              type="password"
              className="form-control"
              placeholder="Inserisci la tua password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="form-text text-danger"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-semibold">
            Accedi
          </button>
        </Form>
      </Formik>
    </div>
  </div>
);

};

export default Login;
