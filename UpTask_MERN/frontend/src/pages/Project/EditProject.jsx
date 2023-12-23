import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import ProjectForm from '../../components/ProjectForm';
import useProjects from '../../hooks/useProjects';
import GlobalCard from '../../components/Card/Card';

function headerContent(name, navigate) {
  return (
    <div className="flex flex-row w-full justify-between items-center">
      <h1 className="text-2xl font-semibold text-white">
        Editar proyecto: {name}
      </h1>
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

function bodyContent() {
  return (
    <div className="mt-4 flex justify-center">
      <ProjectForm />
    </div>
  );
}

export const EditProject = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const { getProject, project, loading } = useProjects();
  const { name } = project;

  useEffect(() => {
    getProject(id);
    // ? React Hook useEffect has missing dependencies
  }, []);

  if (loading) return <Loader />;

  return (
    <GlobalCard
      headerText={headerContent(name, navigate)}
      bodyText={bodyContent()}
    />
  );
};

export default EditProject;
