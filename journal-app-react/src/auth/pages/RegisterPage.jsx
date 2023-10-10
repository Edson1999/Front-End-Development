import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import AuthLayout from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../redux/slice/auth/thunks';

const formData = {
  email: '',
  password: '',
  displayName: '',
};

/* The `formValidations` object is defining the validation rules for each form field in the
registration form. It is an object with keys representing the form field names (`email`, `password`,
`displayName`) and values representing an array of validation rules for each field. */
const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe incluir una @.'],
  password: [
    (value) => value.length >= 6,
    'El password debe tener 6 caracteres.',
  ],
  displayName: [(value) => value.length >= 1, 'El nombre es requerido.'],
};

/**
 * The RegisterPage component is a form for creating a new user account with input fields for name,
 * email, and password.
 * @returns The RegisterPage component is being returned.
 */
const RegisterPage = () => {
  const [formSubmitted, setformSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(
    () => status === 'checking',
    [status]
  );

  const {
    formState,
    displayName,
    email,
    password,
    onInputChange,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  /**
   * The onSubmit function prevents the default form submission, sets a formSubmitted state to true, and
   * dispatches an action to start creating a user with an email and password if the form is valid.
   * @returns If the `isFormValid` condition is not met, nothing is being returned.
   */
  const onSubmit = (event) => {
    event.preventDefault();
    setformSubmitted(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Crear una cuenta">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Chris Walker"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={12} display={errorMessage ? '' : 'none'}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{ borderRadius: '24px' }}
                fullWidth
                disabled={isCheckingAuthentication}
              >
                <Typography>Crear cuenta</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
