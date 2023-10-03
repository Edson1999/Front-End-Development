import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Alert from '../components/Alert';
import DeleteTaskModal from '../components/DeleteTaskModal';
import FormTaskModal from '../components/FormTaskModal';
import Loader from '../components/Loader';
import Task from '../components/Task';
import useProjects from '../hooks/useProjects';

export const Project = () => {
  const params = useParams();
  const { id } = params;
  const { getProject, project, loading, handleTaskModal, alert } =
    useProjects();
  const { name } = project;

  useEffect(() => {
    getProject(id);
    // ? React Hook useEffect has missing dependencies
  }, []);

  if (loading) return <Loader />;
  const { msg } = alert;

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">{name}</h1>
        <div className="flex items-center gap-2 py-2 px-4 rounded-3xl bg-yellow-400 hover:bg-yellow-500 hover:cursor-pointer text-white hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
          <Link className="text-sm" to={`/projects/edit/${id}`}>
            Editar
          </Link>
        </div>
      </div>
      <button
        onClick={handleTaskModal}
        type="button"
        className="w-full md:w-auto text-sm my-2 py-2 px-4 rounded-3xl border bg-blue-600 text-white hover:cursor-pointer hover:bg-blue-800 transition-colors flex gap-2 items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Añadir Tarea
      </button>
      <p className="font-semibold text-xl mt-10">Tareas del Proyecto</p>
      <div className="flex justify-center">
        <div className="md:w-1/3 lg:w-1/4">
          {msg && <Alert alert={alert} />}
        </div>
      </div>
      <div className="rounded-3xl p-4 mt-2">
        {project.tasks?.length ? (
          project.tasks?.map((task) => <Task key={task._id} task={task} />)
        ) : (
          <p className="text-center">No hay tareas en este proyecto</p>
        )}
      </div>
      <div className="flex items-center justify-between mt-4">
        <p className="font-semibold text-xl ">Colaboradores</p>
        <Link
          className="py-2 px-4 text-sm rounded-3xl bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white hover:text-black"
          to={`/projects/new-collaborator/${project._id}`}
        >
          Añadir
        </Link>
      </div>
      <FormTaskModal />
      <DeleteTaskModal />
    </>
  );
};

export default Project;
