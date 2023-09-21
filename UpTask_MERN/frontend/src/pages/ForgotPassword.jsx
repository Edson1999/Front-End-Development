import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../config/axiosClient';
import Alert from '../components/Alert';

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
    } catch (error) {
      setAlert({
        msg: error.response?.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-blue-600 font-black text-5xl capitalize mt-8">
        Recupera tú cuenta y no pierdas el acceso a tus{' '}
        <span className="text-slate-600">proyectos</span>
      </h1>
      {msg && <Alert alert={alert} />}
      <form
        onSubmit={handleSubmit}
        className="my-8 bg-white shadow rounded-3xl py-2 px-4"
      >
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
    </>
  );
};

export default ForgotPassword;
