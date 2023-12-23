import PropTypes from 'prop-types';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Avatar,
} from '@nextui-org/react';
import useProjects from '../../hooks/useProjects';
import { DeleteIcon } from '../Table/DeleteIcon';

const Collaborators = ({ collaborator }) => {
  const { handleDeleteCollaboratorModal } = useProjects();

  return (
    <Table removeWrapper aria-label="Example static collection table">
      <TableHeader>
        <TableColumn className="text-base">Nombre</TableColumn>
        <TableColumn className="text-base">Email</TableColumn>
        <TableColumn className="text-base">Acciones</TableColumn>
      </TableHeader>
      <TableBody>
        {collaborator?.map((collaborators) => (
          <TableRow key={collaborators._id}>
            <TableCell>
              <div className="flex gap-4 items-center">
                <Avatar
                  className="text-blue-700"
                  showFallback
                  src="https://images.unsplash.com/broken"
                />
                {collaborators.name}
              </div>
            </TableCell>
            <TableCell>{collaborators.email}</TableCell>
            <TableCell>
              <Tooltip color="danger" content="Eliminar">
                <button
                  onClick={() => handleDeleteCollaboratorModal(collaborators)}
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                >
                  <DeleteIcon />
                </button>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

Collaborators.propTypes = {
  collaborator: PropTypes.array,
};

export default Collaborators;
