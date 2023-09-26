import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useProjects from '../hooks/useProjects';

const ProjectPreview = ({ project }) => {
  const { _id, name, client } = project;
  const { deteleProject } = useProjects();

  const handleDelete = async () => {
    await deteleProject(_id);
  };

  return (
    <div className="border-b p-4 flex items-center justify-between">
      <div>
        <p className="">{name}</p>
        <span className="text-sm text-gray-500">{client}</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <Link
          className="py-2 px-4 rounded-3xl text-sm border text-white hover:cursor-pointer bg-blue-500 hover:bg-blue-700"
          to={`${_id}`}
        >
          Ver Proyecto
        </Link>
        <button
          onClick={handleDelete}
          className="py-2 px-4 rounded-3xl text-sm border text-white hover:cursor-pointer bg-red-500 hover:bg-red-700"
        >
          Borrar
        </button>
      </div>
    </div>
  );
};

ProjectPreview.propTypes = {
  project: PropTypes.object,
};

export default ProjectPreview;
