import { useState } from 'react';
import useProjects from '../hooks/useProjects';
import Alert from './Alert/Alert';

const FormCollaborator = () => {
  const [email, setEmail] = useState('');
  const { showAlert, alert, submitCollaborator } = useProjects();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === '') {
      showAlert({
        msg: 'Este campo es obligatorio*',
        error: true,
      });
      return;
    }
    submitCollaborator(email);
    setEmail('');
  };

  const { msg } = alert;

  return (
    <form
      onSubmit={handleSubmit}
      className="my-4 rounded-3xl py-2 px-4 w-full md:w-1/2"
    >
      {msg && <Alert alert={alert} />}
      <div className="my-5">
        <label htmlFor="email" className="text-gray-600 block font-bold">
          Email del Colaborador
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email del usuario"
          className="w-full mt-2 py-2 px-4 rounded-3xl border bg-gray-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex w-full justify-center">
        <button
          type="submit"
          className="text-sm my-2 py-2
        px-4 rounded-3xl border bg-blue-600 text-white
        hover:bg-blue-800 transition-colors flex gap-2 items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Buscar colaborador
        </button>
      </div>
    </form>
  );
};

export default FormCollaborator;
