import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormCollaborator from '../components/FormCollaborator';
import Loader from '../components/Loader';
import useProjects from '../hooks/useProjects';

export const NewCollaborator = () => {
  const { getProject, project, loading, collaborator, addCollaborator } =
    useProjects();
  const params = useParams();

  useEffect(() => {
    getProject(params.id);
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold text-blue-600">
        Añadir Colaborador(a) - Proyecto: {project?.name}
      </h1>
      <div className="mt-4 flex justify-center">
        <FormCollaborator />
      </div>
      {loading ? (
        <Loader />
      ) : (
        collaborator?._id && (
          <div className="flex justify-center mt-4">
            <div className="py-10 px-5 md:w-1/2">
              <h2 className="text-center mb-10 text-2xl font-bold">
                Resultado:
              </h2>
              <div className="flex justify-between items-center">
                <p>{collaborator.name}</p>
                <button
                  onClick={() => addCollaborator({ email: collaborator.email })}
                  className="text-sm my-2 py-2 px-4 rounded-3xl border bg-blue-600 text-white hover:cursor-pointer hover:bg-blue-800 transition-colors"
                >
                  Agregar al proyecto
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default NewCollaborator;
