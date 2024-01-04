import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Alert from '../../components/Alert/Alert';
import axiosClient from '../../config/axiosClient';
import useAuth from '../../hooks/useAuth';
import login from '../../resources/login.svg';
import './Login.scss';

export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [alert, setAlert] = useState({});
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const { msg } = alert;

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const { data } = await axiosClient.post('/users/login', {
        email,
        password,
      });
      setAlert({
        title: 'Credenciales válidas',
        msg: 'Tus credenciales de acceso son válidas',
        error: false,
      });

      localStorage.setItem('token', data.token);
      setAuth(data);

      setTimeout(() => {
        reset();
        navigate('/home');
      }, 2000);
    } catch (error) {
      setAlert({
        title: 'Credenciales no válidas',
        msg: error.response.data.msg,
        error: true,
      });

      setTimeout(() => {
        setAlert({});
      }, 4000);
    }
  };

  return (
    <>
      <div className="login">
        <div className="image-login">
          <img src={login} />
        </div>
        <div className="bg-white rounded-3xl">
          <h1 className="font-semibold text-5xl mt-4 text-center">
            ¡Bienvenido a{' '}
            <span className="text-blue-700 text-center">UpTask</span>!
          </h1>
          <h1 className="font-normal text-lg text-center mt-4">
            Inicia sesión y administra tus{' '}
            <span className="text-blue-700">proyectos</span>
          </h1>
          {msg && <Alert alert={alert} />}

          <form className="my-8 py-2 px-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="my-4">
              <div className="flex gap-4 items-center">
                <label className="font-semibold">Email</label>
                {errors?.email?.type === 'required' && (
                  <p className="text-red-600 text-sm">*Requerido</p>
                )}
              </div>
              <input
                type="email"
                placeholder="Email de registro"
                className="w-full mt-2 py-2 px-4 rounded-3xl border bg-gray-100"
                {...register('email', { required: true, maxLength: 20 })}
              />
            </div>

            <div className="my-5">
              <div className="flex gap-4 items-center">
                <label className="font-semibold">Password</label>
                {errors?.password?.type === 'required' && (
                  <p className="text-red-600 text-sm">*Requerido</p>
                )}
              </div>
              <input
                type="password"
                placeholder="Password de registro"
                className="w-full mt-2 py-2 px-4 rounded-3xl border bg-gray-100"
                {...register('password', { required: true, maxLength: 20 })}
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
