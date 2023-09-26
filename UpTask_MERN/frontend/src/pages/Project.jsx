import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import useProjects from '../hooks/useProjects';

export const Project = () => {
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
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">{name}</h1>
      <div className="flex items-center gap-2 py-2 px-4 rounded-3xl bg-yellow-400 hover:bg-yellow-500 hover:cursor-pointer text-gray-600 hover:text-black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>
        <Link to={`/projects/edit/${id}`}>Editar</Link>
      </div>
    </div>
  );
};

export default Project;
