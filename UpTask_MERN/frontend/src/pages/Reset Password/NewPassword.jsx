import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../config/axiosClient';
import Alert from '../../components/Alert/Alert';
import newPassword from '../../resources/new_password.svg';
import './NewPassword.scss';

export const NewPassword = () => {
  const [alert, setAlert] = useState({});
  const [validToken, setValidToken] = useState(false);
  const [password, setPassword] = useState('');
  const [modifiedPassword, setModifiedPassword] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
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
        setTimeout(() => {
          setAlert({});
        }, 3000);
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
      setTimeout(() => {
        setAlert({});
      }, 3000);
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
      setTimeout(() => {
        setAlert({});
        navigate('/');
      }, 3000);
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

  return (
    <>
      <div className="new-password">
        <div className="bg-white rounded-3xl">
          <h1 className="font-semibold text-5xl mt-4 text-center">
            Restablecer{' '}
            <span className="text-blue-700 text-center">Contraseña</span>
          </h1>

          <form onSubmit={handleSubmit} className="my-8 py-2 px-4">
            {msg && <Alert alert={alert} />}
            <div className="my-4">
              <label
                htmlFor="password"
                className="text-gray-600 block font-bold"
              >
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
            {validToken && modifiedPassword && (
              <p>Se te redireccionara al login</p>
            )}
          </form>
        </div>
        <div className="new-password-image">
          <img src={newPassword} />
        </div>
      </div>
    </>
  );
};

export default NewPassword;
