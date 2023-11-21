import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert';
import axiosClient from '../../config/axiosClient';
import useAuth from '../../hooks/useAuth';
import login from '../../resources/login.svg';
import './Login.scss';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
    }

    try {
      const { data } = await axiosClient.post('/users/login', {
        email,
        password,
      });
      setAlert({});
      localStorage.setItem('token', data.token);
      setAuth(data);
      navigate('/projects');
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <div className="login">
        <div className="image-login">
          <img src={login} />
        </div>
        <div className="bg-white rounded-3xl">
          <h1 className="font-semibold text-5xl mt-4 text-center">
            ¡Bienvenido a{' '}
            <span className="text-blue-700 text-center">UpTask</span>
            !
          </h1>
          <h1 className="font-normal text-lg text-center mt-8">
            Inicia sesión y administra tus{' '}
            <span className="text-blue-700">proyectos</span>
          </h1>

          {msg && <Alert alert={alert} />}
          <form onSubmit={handleSubmit} className="my-4 py-2 px-4">
            <div className="my-5">
              <label htmlFor="email" className="text-gray-600 block font-bold">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email de registro"
                className="w-full mt-2 py-2 px-4 rounded-3xl border bg-gray-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-5">
              <label
                htmlFor="password"
                className="text-gray-600 block font-bold"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password de registro"
                className="w-full mt-2 py-2 px-4 rounded-3xl border bg-gray-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Iniciar Sesión"
              className="w-full my-2 py-2 px-4 rounded-3xl border bg-blue-600 text-white hover:cursor-pointer hover:bg-blue-800 transition-colors"
            />
          </form>
          <nav className="lg:flex lg:justify-between mb-4">
            <Link
              className="block text-center text-slate-500 text-sm"
              to="register"
            >
              ¿No tienes una cuenta?{' '}
              <span className="hover:text-blue-900">Crea una nueva</span>
            </Link>
            <Link
              className="block text-center text-slate-500 text-sm hover:text-blue-700"
              to="forgot-password"
            >
              ¿Olvidaste tu password?
            </Link>
          </nav>
        </div>
      </div>
      <footer className="mt-4 text-xs text-right">
        <p>© 2023 UpTask Project, ISC Develop.</p>
      </footer>
    </>
  );
};

export default Login;
