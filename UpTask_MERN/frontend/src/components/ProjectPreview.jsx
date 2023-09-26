import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProjectPreview = ({ project }) => {
  const { _id, name, client } = project;

  return (
    <div className="border-b p-4 flex items-center justify-between">
      <p className="">{name}</p>
      <span className="text-sm text-gray-500">{client}</span>
      <Link
        className="py-2 px-4 rounded-3xl border text-gray-600 hover:cursor-pointer hover:bg-gray-100"
        to={`${_id}`}
      >
        Ver Proyecto
      </Link>
    </div>
  );
};

ProjectPreview.propTypes = {
  project: PropTypes.object,
};

export default ProjectPreview;
