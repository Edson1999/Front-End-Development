import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosClient from '../config/axiosClient';
import Alert from '../components/Alert';

export const ConfirmAccount = () => {
  const [alert, setAlert] = useState({});
  const [confirmedAccount, setConfirmedAccount] = useState(false);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${id}`;
        const resultado = axiosClient(url);
        const { data } = await resultado;

        setAlert({
          msg: data.msg,
          error: false,
        });
        setConfirmedAccount(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    return () => confirmAccount();
  }, [id]);

  const { msg } = alert;

  return (
    <>
      <h1 className="text-blue-600 font-black text-5xl capitalize mt-8">
        Confirma tú cuenta y comienza a crear tus{' '}
        <span className="text-slate-600">proyectos</span>
      </h1>

      <div className="mt-20 md:mt-5 shadow-lg px-4 py-4 rounded-3xl bg-white">
        {msg && <Alert alert={alert} />}
        {confirmedAccount && (
          <Link
            className="block w-full my-2 py-2 px-4 rounded-3xl border bg-blue-600 text-white text-center hover:cursor-pointer hover:bg-blue-800 transition-colors"
            to="/"
          >
            <span>Inicia Sesión</span>
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
