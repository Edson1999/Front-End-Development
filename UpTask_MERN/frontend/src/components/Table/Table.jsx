import PropTypes from 'prop-types';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Chip,
} from '@nextui-org/react';
import { EditIcon } from './EditIcon';
import { DeleteIcon } from './DeleteIcon';
import { EyeIcon } from './EyeIcon';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useProjects from '../../hooks/useProjects';

export default function GlobalTable({ projects }) {
  const { auth } = useAuth();
  const { deteleProject } = useProjects();
  const navigate = useNavigate();

  const handleDelete = async (_id) => {
    await deteleProject(_id);
  };

  return (
    <Table removeWrapper aria-label="Example static collection table">
      <TableHeader>
        <TableColumn className="text-base">Nombre</TableColumn>
        <TableColumn className="text-base">Cliente</TableColumn>
        <TableColumn className="text-base">Rol</TableColumn>
        <TableColumn className="text-base">Status</TableColumn>
        <TableColumn className="text-base">Acciones</TableColumn>
      </TableHeader>

      <TableBody>
        {projects?.map((project) => (
          <TableRow key={project._id}>
            <TableCell>{project?.name}</TableCell>
            <TableCell>{project?.client}</TableCell>
            <TableCell>
              {auth._id !== project.creator ? (
                <Chip color="warning">Colaborador</Chip>
              ) : (
                <Chip color="success">Propietario</Chip>
              )}
            </TableCell>
            <TableCell>Active</TableCell>
            <TableCell>
              <div className="relative flex items-center gap-4">
                <Tooltip content="Visualizar">
                  <button
                    onClick={() => navigate(`${project._id}`)}
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  >
                    <EyeIcon />
                  </button>
                </Tooltip>
                {auth._id === project.creator && (
                  <Tooltip content="Editar">
                    <button
                      onClick={() => navigate(`/projects/edit/${project._id}`)}
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    >
                      <EditIcon />
                    </button>
                  </Tooltip>
                )}
                {auth._id === project.creator && (
                  <Tooltip color="danger" content="Eliminar">
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                    >
                      <DeleteIcon />
                    </button>
                  </Tooltip>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

GlobalTable.propTypes = {
  projects: PropTypes.array,
};
