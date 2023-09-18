import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <>
      <h1 className="text-blue-600 font-black text-5xl capitalize mt-8">
        Inicia sesión y administra tus{' '}
        <span className="text-slate-600">proyectos</span>
      </h1>
      <form className="my-8 bg-white shadow rounded-3xl py-2 px-4">
        <div className="my-5">
          <label htmlFor="email" className="text-gray-600 block font-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de registro"
            className="w-full mt-2 py-2 px-4 rounded-3xl border bg-gray-100"
          />
        </div>
        <div className="my-5">
          <label htmlFor="password" className="text-gray-600 block font-bold">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de registro"
            className="w-full mt-2 py-2 px-4 rounded-3xl border bg-gray-100"
          />
        </div>
        <input
          type="submit"
          value="Iniciar Sesión"
          className="w-full my-2 py-2 px-4 rounded-3xl border bg-blue-600 text-white hover:cursor-pointer hover:bg-blue-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
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
    </>
  );
};

export default Login;
