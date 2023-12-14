import GlobalCard from '../components/Card/Card';
import ProjectForm from '../components/ProjectForm';

function headerContent() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white">Crear Proyectos</h1>
    </>
  );
}

function bodyContent() {
  return (
    <>
      <div className="mt-4 flex justify-center">
        <ProjectForm />
      </div>
    </>
  );
}

export const NewProject = () => {
  return <GlobalCard headerText={headerContent()} bodyText={bodyContent()} />;
};

export default NewProject;
