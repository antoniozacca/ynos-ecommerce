import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: ''
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
      .matches(/[@$!%*?&]/, 'Deve contenere un carattere speciale'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Le password non coincidono')
      .required('Conferma la password'),
  });

  const handleSubmit = (values) => {
    // Salvataggio su localStorage (solo per test)
    localStorage.setItem('user', JSON.stringify(values));
    alert('Registrazione completata');
    navigate('/login');
  };

  return (
  <div className="container mt-5 d-flex justify-content-center">
    <div className="card shadow-sm p-4" style={{ maxWidth: '450px', width: '100%' }}>
      <h2 className="text-center mb-4">Registrazione</h2>
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

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">Password</label>
            <Field
              id="password"
              name="password"
              type="password"
              className="form-control"
              placeholder="Almeno 8 caratteri, una maiuscola, un numero e un simbolo"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="form-text text-danger"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label fw-semibold">Conferma Password</label>
            <Field
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="form-control"
              placeholder="Ripeti la password"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="form-text text-danger"
            />
          </div>

          <button type="submit" className="btn btn-success w-100 fw-semibold">
            Registrati
          </button>
        </Form>
      </Formik>
    </div>
  </div>
);

};

export default Register;
