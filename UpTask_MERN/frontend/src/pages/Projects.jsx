import useProjects from '../hooks/useProjects';

export const Projects = () => {
  const { projects } = useProjects();
  console.log(projects);
  return (
    <>
      <h1 className="text-2xl font-bold text-blue-600">Proyectos</h1>
      <div></div>
    </>
  );
};

export default Projects;
