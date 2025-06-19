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
    <div className="container mt-4">
      <h2>Registrati</h2>
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

          <div className="mb-3">
            <label>Conferma Password</label>
            <Field name="confirmPassword" type="password" className="form-control" />
            <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
          </div>

          <button type="submit" className="btn btn-primary">Registrati</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
