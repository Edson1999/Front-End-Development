import PropTypes from 'prop-types';
import useProjects from '../hooks/useProjects';

const Collaborator = ({ collaborator }) => {
  const { handleDeleteCollaboratorModal } = useProjects();
  const { name, email } = collaborator;

  return (
    <div className="p-4 flex justify-between items-center">
      <div>
        <p>{name}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
      <div>
        <button
          type="button"
          onClick={() => handleDeleteCollaboratorModal(collaborator)}
          className="py-2 px-4 rounded-3xl text-sm border text-white hover:cursor-pointer bg-red-500 hover:bg-red-700 items-center justify-center"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

Collaborator.propTypes = {
  collaborator: PropTypes.object,
};

export default Collaborator;
