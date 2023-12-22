import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import ProjectForm from '../components/ProjectForm';
import useProjects from '../hooks/useProjects';
import GlobalCard from '../components/Card/Card';

function headerContent(name) {
  return (
    <h1 className="text-2xl font-semibold text-white">
      Editar proyecto: {name}
    </h1>
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
  const { id } = params;
  const { getProject, project, loading } = useProjects();
  const { name } = project;

  useEffect(() => {
    getProject(id);
    // ? React Hook useEffect has missing dependencies
  }, []);

  if (loading) return <Loader />;

  return (
    <GlobalCard headerText={headerContent(name)} bodyText={bodyContent()} />
  );
};

export default EditProject;
