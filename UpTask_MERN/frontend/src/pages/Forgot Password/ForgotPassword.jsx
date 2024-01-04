import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../config/axiosClient';
import Alert from '../../components/Alert/Alert';
import forgotpassword from '../../resources/forgot-password.svg';
import './ForgotPassword.scss';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '' || email.length < 6) {
      setAlert({
        msg: 'El email es obligatorio',
        error: true,
      });

      setTimeout(() => {
        setAlert({});
      }, 3000);

      return;
    }
    try {
      const { data } = await axiosClient.post(`/users/forgot-password`, {
        email,
      });
      setAlert({
        msg: data.msg,
        error: false,
      });
      setEmail('');
      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      setAlert({
        msg: error.response?.data.msg,
        error: true,
      });

      setTimeout(() => {
        setAlert({});
      }, 3000);
    }
  };

  const { msg } = alert;

  return (
    <>
      <div className="forgot-password">
        <div className="forgot-password-image">
          <img src={forgotpassword} />
        </div>
        <div className="bg-white rounded-3xl">
          <h1 className="font-semibold text-5xl mt-4 text-center">
            Restablecer{' '}
            <span className="text-blue-700 text-center">Contraseña</span>
          </h1>
          <h1 className="font-normal text-lg text-center mt-4">
            Recupera tu cuenta y no pierdas acceso a tus{' '}
            <span className="text-blue-700">proyectos</span>
          </h1>

          <form onSubmit={handleSubmit} className="my-8 py-2 px-4">
            {msg && <Alert alert={alert} />}
            <div className="my-4">
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
            <input
              type="submit"
              value="Enviar Instrucciones"
              className="w-full my-2 py-2 px-4 rounded-3xl border bg-blue-600 text-white hover:cursor-pointer hover:bg-blue-800 transition-colors"
            />
          </form>
          <nav className="lg:flex lg:justify-between">
            <Link className="block text-center text-slate-500 text-sm" to="/">
              ¿Ya tienes una cuenta?{' '}
              <span className="hover:text-blue-900">Inicia Sesión</span>
            </Link>
            <Link
              className="block text-center text-slate-500 text-sm"
              to="/register"
            >
              ¿No tienes una cuenta?{' '}
              <span className="hover:text-blue-900">Crea una nueva</span>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
