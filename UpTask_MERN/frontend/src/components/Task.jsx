import PropTypes from 'prop-types';
import { DateFormat } from '../helpers/DateFormat';
import useProjects from '../hooks/useProjects';

const Task = ({ task }) => {
  const { handleModalEditTask, handleModalDeleteTask } = useProjects();
  const { name, description, priority, deadline, state, _id } = task;

  return (
    <div className="border-b p-2 flex flex-row gap-4 items-center flex-wrap justify-between">
      <div>
        <p className="text-base">{name}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div>
        <p className="text-base">{DateFormat(deadline)}</p>
      </div>
      <div>
        <p className="text-base">{priority}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleModalEditTask(task)}
          className="py-2 px-4 rounded-3xl text-sm border text-white hover:cursor-pointer bg-indigo-500 hover:bg-indigo-700 flex gap-2 items-center justify-center"
        >
          Editar
        </button>
        {state ? (
          <button className="py-2 px-4 rounded-3xl text-sm border text-white hover:cursor-pointer bg-green-500 hover:bg-green-700 flex gap-2 items-center justify-center">
            Completa
          </button>
        ) : (
          <button className="py-2 px-4 rounded-3xl text-sm border text-white hover:cursor-pointer bg-yellow-500 hover:bg-yellow-700 flex gap-2 items-center justify-center">
            Incompleta
          </button>
        )}
        <button
          onClick={() => handleModalDeleteTask(task)}
          className="py-2 px-4 rounded-3xl text-sm border text-white hover:cursor-pointer bg-red-500 hover:bg-red-700 flex gap-2 items-center justify-center"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.object,
};

export default Task;
