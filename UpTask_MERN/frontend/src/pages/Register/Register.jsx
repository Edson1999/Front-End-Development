import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../config/axiosClient';
import Alert from '../../components/Alert/Alert';
import register from '../../resources/register.svg';
import './Register.scss';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');

  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, email, password, repetirPassword].includes('')) {
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });

      setTimeout(() => {
        setAlert({});
      }, 3000);

      return;
    }

    if (password !== repetirPassword) {
      setAlert({
        msg: 'Las contraseñas no coinciden',
        error: true,
      });

      setTimeout(() => {
        setAlert({});
      }, 3000);

      return;
    }

    if (password.length < 6) {
      setAlert({
        msg: 'El password debe tener más de 6 caracteres',
        error: true,
      });

      setTimeout(() => {
        setAlert({});
      }, 3000);

      return;
    }

    setAlert({});

    // Create user in API
    // Send api request to create users
    try {
      const respuesta = await axiosClient.post(`/users`, {
        name,
        email,
        password,
      });
      const { data } = await respuesta;
      setAlert({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlert({});
      }, 3000);

      setName('');
      setEmail('');
      setPassword('');
      setRepetirPassword('');
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
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
      <div className="register">
        <div className="bg-white rounded-3xl">
          <h1 className="font-semibold text-5xl mt-4 text-center">Registro</h1>
          <h1 className="font-normal text-lg text-center mt-4">
            Crea tu cuenta y administra tus{' '}
            <span className="text-blue-700">proyectos</span>
          </h1>

          <form onSubmit={handleSubmit} className="my-8 py-2 px-4">
            {msg && <Alert alert={alert} />}
            <div className="my-4">
              <label htmlFor="nombre" className="text-gray-600 block font-bold">
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="Ingresa tú nombre"
                className="w-full mt-2 py-2 px-4 rounded-3xl border bg-gray-100"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
            <div className="my-5">
              <label
                htmlFor="rep-password"
                className="text-gray-600 block font-bold"
              >
                Repetir Password
              </label>
              <input
                id="rep-password"
                type="password"
                placeholder="Repetir tú Password"
                className="w-full mt-2 py-2 px-4 rounded-3xl border bg-gray-100"
                value={repetirPassword}
                onChange={(e) => setRepetirPassword(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Crear Cuenta"
              className="w-full my-2 py-2 px-4 rounded-3xl border bg-blue-600 text-white hover:cursor-pointer hover:bg-blue-800 transition-colors"
            />
          </form>
          <nav className="lg:flex lg:justify-between mb-8 px-4">
            <Link className="block text-center text-slate-500 text-sm" to="/">
              ¿Ya tienes una cuenta?{' '}
              <span className="hover:text-blue-900">Inicia Sesión</span>
            </Link>
            <Link
              className="block text-center text-slate-500 text-sm hover:text-blue-700"
              to="/forgot-password"
            >
              ¿Olvidaste tu password?
            </Link>
          </nav>
        </div>
        <div className="register-image">
          <img src={register} />
        </div>
      </div>
    </>
  );
};

export default Register;
