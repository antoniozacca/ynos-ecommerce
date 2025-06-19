import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // import del contesto

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // prendo la funzione login dal context

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
      login(savedUser); // aggiorno il context
      alert('Login effettuato!');
      navigate('/'); // vado nella home
    } else {
      alert('Credenziali non valide');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="form">
          <div className="mb-3">
            <label>Email</label>
            <Field name="email" type="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <Field name="password" type="password" className="form-control" />
            <ErrorMessage name="password" component="div" className="text-danger" />
          </div>

          <button type="submit" className="btn btn-primary">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
