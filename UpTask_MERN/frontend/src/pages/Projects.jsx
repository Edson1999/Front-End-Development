import Alert from '../components/Alert';
import ProjectPreview from '../components/ProjectPreview';
import useProjects from '../hooks/useProjects';

export const Projects = () => {
  const { projects, alert } = useProjects();
  const { msg } = alert;

  return (
    <>
      <h1 className="text-2xl font-bold text-blue-600">Proyectos</h1>

      {msg && <Alert alert={alert} />}

      <div className="mt-4">
        {projects.length ? (
          projects.map((project) => (
            <ProjectPreview key={project._id} project={project} />
          ))
        ) : (
          <p>No hay proyectos</p>
        )}
      </div>
    </>
  );
};

export default Projects;
