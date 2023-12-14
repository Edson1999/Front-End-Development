import Alert from '../components/Alert';
import GlobalCard from '../components/Card/Card';
import ProjectPreview from '../components/ProjectPreview';
import useProjects from '../hooks/useProjects';

function headerContent() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white">Proyectos</h1>
    </>
  );
}

function bodyContent(projects, msg) {
  return (
    <>
      {msg && <Alert alert={alert} />}

      <div>
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
}

export const Projects = () => {
  const { projects, alert } = useProjects();
  const { msg } = alert;
  return (
    <GlobalCard
      headerText={headerContent()}
      bodyText={bodyContent(projects, msg)}
    />
  );
};

export default Projects;
