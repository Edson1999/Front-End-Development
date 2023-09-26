import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import ProjectForm from '../components/ProjectForm';
import useProjects from '../hooks/useProjects';

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
    <>
      <h1 className="text-2xl font-bold text-blue-600">
        Editar proyecto: {name}
      </h1>
      <div className="mt-4 flex justify-center">
        <ProjectForm />
      </div>
    </>
  );
};

export default EditProject;
