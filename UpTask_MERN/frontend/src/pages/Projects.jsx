import useProjects from '../hooks/useProjects';

export const Projects = () => {
  const { projects } = useProjects();
  console.log(projects);
  return (
    <>
      <h1 className="text-4xl font-bold">Proyectos</h1>
      <div></div>
    </>
  );
};

export default Projects;
