import { useState } from 'react';
import useProjects from '../hooks/useProjects';
import Alert from './Alert';

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
  };

  const { msg } = alert;

  return (
    <form
      onSubmit={handleSubmit}
      className="my-4 rounded-3xl py-2 px-4 md:w-1/2"
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
      <input
        type="submit"
        value="Buscar colaborador"
        className="w-full text-sm my-2 py-2 px-4 rounded-3xl border bg-blue-600 text-white hover:cursor-pointer hover:bg-blue-800 transition-colors"
      />
    </form>
  );
};

export default FormCollaborator;
