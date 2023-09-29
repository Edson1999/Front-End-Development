import PropTypes from 'prop-types';
import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import useProjects from '../hooks/useProjects';
import Alert from './Alert';
import { useParams } from 'react-router-dom';

const PRIORITY = ['Baja', 'Media', 'Alta'];

const ModalFormularioTarea = () => {
  const { formTaskModal, handleTaskModal, showAlert, alert, submitTask } =
    useProjects();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');

  const params = useParams();
  const { id } = params;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, description, deadline, priority].includes('')) {
      showAlert({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }
    await submitTask({ name, description, deadline, priority, project: id });
    setName('');
    setDescription('');
    setDeadline('');
    setPriority('');
  };

  const { msg } = alert;

  return (
    <Transition.Root show={formTaskModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleTaskModal}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-3xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-red-400 hover:text-red-500 focus:outline-none"
                  onClick={handleTaskModal}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-semibold text-gray-900"
                  >
                    Crear Tarea
                  </Dialog.Title>
                  {msg && <Alert alert={alert} />}
                  <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-2">
                      <label className="text-gray-700 text-base" htmlFor="name">
                        Nombre
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-full mt-2 py-2 px-4 rounded-3xl border placeholder-gray-400"
                        placeholder="Nombre de la tarea"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        className="text-gray-700 text-base"
                        htmlFor="description"
                      >
                        Descripción
                      </label>
                      <textarea
                        id="description"
                        className="w-full mt-2 py-2 px-4 rounded-3xl border placeholder-gray-400"
                        placeholder="Descripción de la tarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        className="text-gray-700 text-base"
                        htmlFor="deadline"
                      >
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
                      <label
                        className="text-gray-700 text-base"
                        htmlFor="priority"
                      >
                        Prioridad
                      </label>
                      <select
                        id="priority"
                        className="w-full mt-2 py-2 px-4 rounded-3xl border placeholder-gray-400"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                      >
                        <option value="">-- Seleccione una opción --</option>
                        {PRIORITY.map((priority) => (
                          <option key={priority}>{priority}</option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="submit"
                      value="Crear Tarea"
                      className="w-full mt-4 py-2 px-4 text-sm rounded-3xl border bg-blue-600 text-white hover:cursor-pointer hover:bg-blue-800 transition-colors"
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

ModalFormularioTarea.propTypes = {
  modal: PropTypes.bool,
  setModal: PropTypes.func,
};

export default ModalFormularioTarea;
