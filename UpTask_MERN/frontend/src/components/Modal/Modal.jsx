import { useEffect, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  // useDisclosure,
} from '@nextui-org/react';
import useProjects from '../../hooks/useProjects';
import Alert from '../Alert';
import { useParams } from 'react-router-dom';

const PRIORITY = ['Baja', 'Media', 'Alta'];

const GlobalModal = () => {
  const [taskId, setTaskId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');

  const params = useParams();
  const { id } = params;

  const { formTaskModal, handleTaskModal, showAlert, alert, submitTask, task } =
    useProjects();

  // const { isOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (task._id) {
      setTaskId(task._id);
      setName(task.name);
      setDescription(task.description);
      setDeadline(task.deadline.split('T')[0]);
      setPriority(task.priority);
      return;
    }
    setTaskId('');
    setName('');
    setDescription('');
    setDeadline('');
    setPriority('');
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, description, deadline, priority].includes('')) {
      showAlert({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }
    await submitTask({
      taskId,
      name,
      description,
      deadline,
      priority,
      project: id,
    });
    setTaskId('');
    setName('');
    setDescription('');
    setDeadline('');
    setPriority('');
  };

  const { msg } = alert;

  return (
    <Modal
      backdrop="blur"
      isOpen={formTaskModal}
      onClose={handleTaskModal}
      placement="center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader
              className={`flex flex-col gap-1 ${
                task._id ? 'bg-yellow-400' : 'bg-green-400'
              }`}
            >
              {taskId ? 'Editar Tarea' : 'Crear Tarea'}
            </ModalHeader>
            <Divider />
            <ModalBody>
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
                  <label className="text-gray-700 text-base" htmlFor="priority">
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
                  value={taskId ? 'Guardar Cambios' : 'Crear Tarea'}
                  className="w-full mt-4 py-2 px-4 text-sm rounded-3xl border bg-blue-600 text-white hover:cursor-pointer hover:bg-blue-800 transition-colors"
                />
              </form>
            </ModalBody>

            {/* Revisar para incorporar al form */}
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
              <Button color="primary" onPress={onClose}>
                {taskId ? 'Guardar Cambios' : 'Crear Tarea'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default GlobalModal;
