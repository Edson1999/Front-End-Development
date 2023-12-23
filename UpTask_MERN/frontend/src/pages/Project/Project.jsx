import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteCollaboratorModal from '../../components/DeleteCollaboratorModal';
import DeleteTaskModal from '../../components/DeleteTaskModal';
import Loader from '../../components/Loader';
import useAdmin from '../../hooks/useAdmin';
import useProjects from '../../hooks/useProjects';
import GlobalCard from '../../components/Card/Card';
import GlobalModal from '../../components/Modal/Modal';
import TaskTable from '../../components/Task/Task';
import io from 'socket.io-client';
import Collaborators from '../../components/Collaborators/Collaborators';

let socket;

function headerContent(name, navigate) {
  return (
    <div className="flex flex-row w-full justify-between items-center">
      <h1 className="text-2xl font-semibold text-white">{name}</h1>
      <button
        className="flex items-center gap-2 py-2 px-4 rounded-3xl bg-white hover:bg-slate-100 hover:cursor-pointe text-sm"
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
    </div>
  );
}

function bodyContent(admin, handleTaskModal, project, navigate) {
  return (
    <>
      <p className="font-semibold text-xl">Tareas del Proyecto</p>

      {admin && (
        <div className="flex justify-end">
          <button
            onClick={handleTaskModal}
            type="button"
            className="text-sm py-2 px-4 rounded-3xl border bg-blue-600 text-white hover:bg-blue-800 transition-colors flex gap-2 items-center justify-center"
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

      <div className="p-4 mt-2">
        {project.tasks?.length ? (
          <TaskTable tasks={project.tasks} />
        ) : (
          <p className="text-center">No hay tareas en este proyecto</p>
        )}
      </div>

      {admin && (
        <>
          <p className="font-semibold text-xl mt-2">Colaboradores</p>

          <div className="flex justify-end">
            <button
              onClick={() =>
                navigate(`/projects/new-collaborator/${project._id}`)
              }
              className="flex gap-2 py-2 px-4 text-sm rounded-3xl bg-green-500 hover:bg-green-600 text-white transition-colors"
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
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
              </svg>
              Añadir
            </button>
          </div>

          <div className="p-4 mt-2">
            {project.collaborators?.length ? (
              <Collaborators collaborator={project.collaborators} />
            ) : (
              <p className="text-center">
                No hay colaboradores en este proyecto
              </p>
            )}
          </div>
        </>
      )}

      <GlobalModal />
      {/* Check other modal components */}
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
      headerText={headerContent(name, navigate)}
      bodyText={bodyContent(admin, handleTaskModal, project, navigate)}
    />
  );
};

export default Project;
