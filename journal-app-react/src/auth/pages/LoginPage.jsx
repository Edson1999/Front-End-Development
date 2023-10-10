import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
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
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from '../../redux/slice/auth';

const formData = {
  email: '',
  password: '',
};

/* The `LoginPage` component is a React functional component that represents the login page of an
application. It uses various React and Material-UI components to create a form for users to enter
their email and password to log in. */
const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticated = useMemo(() => status === 'checking', [status]);

  /**
   * The onSubmit function prevents the default form submission behavior, and dispatches an action to
   * start the login process with an email and password.
   */
  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  /**
   * The function `onGoogleSignIn` dispatches the action `startGoogleSignIn`.
   */
  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="corre@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="constraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} display={errorMessage ? '' : 'none'}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                sx={{ borderRadius: '24px' }}
                fullWidth
                type="submit"
                disabled={isAuthenticated}
              >
                <Typography>Login</Typography>
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                sx={{ borderRadius: '24px' }}
                fullWidth
                onClick={onGoogleSignIn}
                disabled={isAuthenticated}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
