import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../config/axiosClient';
import Alert from '../../components/Alert';
import './ConfirmAccount.scss';
import account from '../../resources/account_confirmed.svg';

export const ConfirmAccount = () => {
  const [alert, setAlert] = useState({});
  const [confirmedAccount, setConfirmedAccount] = useState(false);
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

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
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    };
    return () => confirmAccount();
  }, [id]);

  const { msg } = alert;

  return (
    <>
      <div className="confirmAccount">
        <div className="confirmAccount-image">
          <img src={account} />
        </div>
        <div className="bg-white rounded-3xl">
          <h1 className="font-semibold text-5xl mt-4 text-center">
            Validación de tu{' '}
            <span className="text-blue-700 text-center">Cuenta</span>
          </h1>
          <h1 className="font-normal text-lg text-center mt-4">
            Confirma tú cuenta y comienza a crear tus{' '}
            <span className="text-blue-700">proyectos</span>
          </h1>

          <div className="mt-20 md:mt-5 rounded-3xl px-4 py-4 bg-white">
            {msg && <Alert alert={alert} />}
            {confirmedAccount && (
              <Link
                className="block w-full md:mt-10 my-2 py-2 px-4 rounded-3xl border bg-blue-600 text-white text-center hover:cursor-pointer hover:bg-blue-800 transition-colors"
                to="/"
              >
                <span>Inicia Sesión</span>
              </Link>
            )}
            {!confirmedAccount && (
              <p className="text-center mt-8">Serás redireccionado al login.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmAccount;
