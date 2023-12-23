import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Alert from '../../components/Alert';
import FormCollaborator from '../../components/FormCollaborator';
import Loader from '../../components/Loader';
import useProjects from '../../hooks/useProjects';
import GlobalCard from '../../components/Card/Card';
import { Avatar } from '@nextui-org/react';

function headerContent(project) {
  return (
    <h1 className="text-2xl font-semibold text-white">
      Añadir Colaborador(a) - Proyecto: {project?.name}
    </h1>
  );
}

function bodyContent(loading, collaborator, addCollaborator) {
  return (
    <>
      <div className="mt-4 flex justify-center">
        <FormCollaborator />
      </div>
      {loading ? (
        <Loader />
      ) : (
        collaborator?._id && (
          <div className="flex justify-center mt-4">
            <div className="py-10 px-5 md:w-1/2 w-full">
              <h2 className="text-center mb-10 text-2xl font-bold">
                Resultado:
              </h2>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <Avatar
                    className="text-blue-700"
                    showFallback
                    src="https://images.unsplash.com/broken"
                  />
                  <p>{collaborator.name}</p>
                </div>
                <button
                  onClick={() => addCollaborator({ email: collaborator.email })}
                  className="flex gap-2 text-sm my-2 py-2 px-4 rounded-3xl border bg-blue-600 text-white hover:cursor-pointer hover:bg-blue-800 transition-colors"
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
                  Agregar al proyecto
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}

export const NewCollaborator = () => {
  const { getProject, project, loading, collaborator, addCollaborator, alert } =
    useProjects();
  const params = useParams();

  useEffect(() => {
    getProject(params.id);
  }, []);

  if (!project) return <Alert alert={alert} />;

  return (
    <GlobalCard
      headerText={headerContent(project)}
      bodyText={bodyContent(loading, collaborator, addCollaborator)}
    />
  );
};

export default NewCollaborator;
