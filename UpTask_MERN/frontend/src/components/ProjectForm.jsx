import { useState } from 'react';
import useProjects from '../hooks/useProjects';
import Alert from './Alert';

const ProjectForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [client, setClient] = useState('');

  const { showAlert, alert, submitProject } = useProjects();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, description, deadline, client].includes('')) {
      showAlert({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });

      return;
    }

    // Send data to provider
    await submitProject({ name, description, deadline, client });
    setName('');
    setDescription('');
    setDeadline('');
    setClient('');
  };

  const { msg } = alert;

  return (
    <form onSubmit={handleSubmit} className=" px-5 ">
      {msg && <Alert alert={alert} />}
      <div className="mb-2">
        <label className="text-gray-700 text-base" htmlFor="name">
          Nombre del proyecto
        </label>
        <input
          id="name"
          type="text"
          className="w-full mt-2 py-2 px-4 rounded-3xl border placeholder-gray-400"
          placeholder="Nombre del proyecto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="text-gray-700 text-base" htmlFor="description">
          Descripción
        </label>
        <textarea
          id="description"
          className="w-full mt-2 py-2 px-4 rounded-3xl border placeholder-gray-400"
          placeholder="Descripción del proyecto"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="text-gray-700 text-base" htmlFor="deadline">
          Fecha de entrega
        </label>
        <input
          id="deadline"
          type="date"
          className="w-full mt-2 py-2 px-4 rounded-3xl border placeholder-gray-400"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="text-gray-700 text-base" htmlFor="client">
          Nombre del cliente
        </label>
        <input
          id="client"
          type="text"
          className="w-full mt-2 py-2 px-4 rounded-3xl border placeholder-gray-400"
          placeholder="Nombre del cliente"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
      </div>
      <input
        type="submit"
        value="Crear Proyecto"
        className="w-full my-2 py-2 px-4 rounded-3xl border bg-blue-600 text-white hover:cursor-pointer hover:bg-blue-800 transition-colors"
      />
    </form>
  );
};

export default ProjectForm;
