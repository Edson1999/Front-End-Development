import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Collaborator from '../components/Collaborator';
import DeleteCollaboratorModal from '../components/DeleteCollaboratorModal';
import DeleteTaskModal from '../components/DeleteTaskModal';
// import FormTaskModal from '../components/FormTaskModal';
import Loader from '../components/Loader';
import Task from '../components/Task';
import useAdmin from '../hooks/useAdmin';
import useProjects from '../hooks/useProjects';
import io from 'socket.io-client';
import GlobalCard from '../components/Card/Card';
import GlobalModal from '../components/Modal/Modal';

let socket;

function headerContent(admin, name, navigate) {
  return (
    <div className="flex flex-row w-full justify-between items-center">
      <h1 className="text-2xl font-semibold text-white">{name}</h1>
      {admin && (
        <button
          className="flex items-center gap-2 py-2 px-4 rounded-3xl bg-white hover:bg-slate-200 hover:cursor-pointe text-sm"
          onClick={() => navigate(-1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            data-slot="icon"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Regresar
        </button>
      )}
    </div>
  );
}

function bodyContent(admin, handleTaskModal, project) {
  return (
    <>
      {admin && (
        <div className="flex justify-end">
          <button
            onClick={handleTaskModal}
            type="button"
            className="text-sm my-2 py-2 px-4 rounded-3xl border bg-blue-600 text-white hover:cursor-pointer hover:bg-blue-800 transition-colors flex gap-2 items-center justify-center"
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
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Añadir Tarea
          </button>
        </div>
      )}
      <p className="font-semibold text-xl">Tareas del Proyecto</p>

      <div className="rounded-3xl p-4 mt-2">
        {project.tasks?.length ? (
          project.tasks?.map((task) => <Task key={task._id} task={task} />)
        ) : (
          <p className="text-center">No hay tareas en este proyecto</p>
        )}
      </div>
      {admin && (
        <>
          <div className="flex items-center justify-between mt-4">
            <p className="font-semibold text-xl ">Colaboradores</p>
            <Link
              className="py-2 px-4 text-sm rounded-3xl bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white hover:text-black"
              to={`/projects/new-collaborator/${project._id}`}
            >
              Añadir
            </Link>
          </div>

          <div className="rounded-3xl p-4 mt-2">
            {project.collaborators?.length ? (
              project.collaborators?.map((collaborator) => (
                <Collaborator
                  key={collaborator._id}
                  collaborator={collaborator}
                />
              ))
            ) : (
              <p className="text-center">
                No hay colaboradores en este proyecto
              </p>
            )}
          </div>
        </>
      )}

      {/* Check other modal components */}
      <GlobalModal />
      {/* <FormTaskModal /> */}
      <DeleteTaskModal />
      <DeleteCollaboratorModal />
    </>
  );
}

export const Project = () => {
  const params = useParams();
  const { id } = params;
  const {
    getProject,
    project,
    loading,
    handleTaskModal,
    submitProjectTasks,
    deletedProjectTask,
    updateProjectTask,
    completeProjectTask,
  } = useProjects();
  const { name } = project;
  const admin = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    getProject(id);
    // ? React Hook useEffect has missing dependencies
  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit('open project', id);
    // ? React Hook useEffect has missing dependencies
  }, []);

  useEffect(() => {
    socket.on('task added', (newTask) => {
      if (newTask.project === project._id) {
        submitProjectTasks(newTask);
      }
    });

    socket.on('task deleted', (deleteTask) => {
      if (deleteTask.project === project._id) {
        deletedProjectTask(deleteTask);
      }
    });

    socket.on('task updated', (updatedTask) => {
      if (updatedTask.project._id === project._id) {
        updateProjectTask(updatedTask);
      }
    });

    socket.on('task completed', (completeTask) => {
      if (completeTask.project._id === project._id) {
        completeProjectTask(completeTask);
      }
    });
  });

  if (loading) return <Loader />;

  return (
    <GlobalCard
      headerText={headerContent(admin, name, navigate)}
      bodyText={bodyContent(admin, handleTaskModal, project)}
    />
  );
};

export default Project;
