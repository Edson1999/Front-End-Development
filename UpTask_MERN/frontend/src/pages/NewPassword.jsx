import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosClient from '../config/axiosClient';
import Alert from '../components/Alert';

export const NewPassword = () => {
  const [alert, setAlert] = useState({});
  const [validToken, setValidToken] = useState(false);
  const [password, setPassword] = useState('');
  const [modifiedPassword, setModifiedPassword] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axiosClient(`/users/forgot-password/${token}`);
        setValidToken(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    checkToken();
  }, [token]);

  const { msg } = alert;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({
        msg: 'El password debe tener al menos 6 caracteres',
        error: true,
      });
      return;
    }

    try {
      const url = `/users/forgot-password/${token}`;
      const { data } = await axiosClient.post(url, { password });
      setAlert({
        msg: data.msg,
        error: false,
      });
      setModifiedPassword(true);
      setPassword('');
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <h1 className="text-blue-600 font-black text-5xl capitalize mt-8">
        Restablecer tú password
      </h1>
      {msg && <Alert alert={alert} />}
      {validToken && (
        <form
          onSubmit={handleSubmit}
          className="my-8 bg-white shadow rounded-3xl py-2 px-4"
        >
          <div className="my-5">
            <label htmlFor="password" className="text-gray-600 block font-bold">
              Nuevo Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tú nuevo Password"
              className="w-full mt-2 py-2 px-4 rounded-3xl border bg-gray-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Establecer nuevo password"
            className="w-full my-2 py-2 px-4 rounded-3xl border bg-blue-600 text-white hover:cursor-pointer hover:bg-blue-800 transition-colors"
          />
        </form>
      )}
      {modifiedPassword && (
        <Link
          className="block w-full my-2 py-2 px-4 rounded-3xl border bg-blue-600 text-white text-center hover:cursor-pointer hover:bg-blue-800 transition-colors"
          to="/"
        >
          <span>Inicia Sesión</span>
        </Link>
      )}
    </>
  );
};

export default NewPassword;
