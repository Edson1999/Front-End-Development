import ProjectForm from '../components/ProjectForm';

export const NewProject = () => {
  return (
    <>
      <h1 className="text-2xl font-bold text-blue-600">Crear Proyecto</h1>
      <div className="mt-4 flex justify-center">
        <ProjectForm />
      </div>
    </>
  );
};

export default NewProject;
