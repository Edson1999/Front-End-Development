import Alert from '../../components/Alert';
import GlobalCard from '../../components/Card/Card';
import GlobalTable from '../../components/Table/Table';
import useProjects from '../../hooks/useProjects';

function headerContent(projects) {
  return (
    <>
      <h1 className="text-2xl font-semibold text-white">
        Proyectos ({projects.length})
      </h1>
    </>
  );
}

function bodyContent(projects, alert, msg) {
  return (
    <>
      {msg && <Alert alert={alert} />}

      <div>
        {projects.length ? (
          <GlobalTable projects={projects} />
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
      headerText={headerContent(projects)}
      bodyText={bodyContent(projects, alert, msg)}
    />
  );
};

export default Projects;
