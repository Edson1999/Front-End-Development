import PropTypes from 'prop-types';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from '@nextui-org/react';
import useProjects from '../../hooks/useProjects';
import useAdmin from '../../hooks/useAdmin';
import { DateFormat } from '../../helpers/DateFormat';
import { EditIcon } from '../Table/EditIcon';
import { DeleteIcon } from '../Table/DeleteIcon';
import { InfoIcon } from './InfoIcon';
import { CheckIcon } from './CheckIcon';
import { CheckTask } from './CheckTask';
import { CancelTask } from './CancelTask';

export default function TaskTable({ tasks }) {
  const { handleModalEditTask, handleModalDeleteTask, taskComplete } =
    useProjects();
  const admin = useAdmin();

  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn className="text-base">Nombre</TableColumn>
        <TableColumn className="text-base">Descripción</TableColumn>
        <TableColumn className="text-base">Fecha</TableColumn>
        <TableColumn className="text-base">Prioridad</TableColumn>
        <TableColumn className="text-base">Status</TableColumn>
        <TableColumn className="text-base">Acciones</TableColumn>
      </TableHeader>
      <TableBody>
        {tasks?.map((task) => (
          <TableRow key={task._id}>
            <TableCell>{task.name}</TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell>{DateFormat(task.deadline)}</TableCell>
            <TableCell>{task.priority}</TableCell>
            <TableCell>
              {task.state ? (
                <div className="flex gap-2 items-center">
                  <CheckIcon className="text-success" />
                  <p>Completada por: {task.complete.name}</p>
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <InfoIcon className="text-warning" />
                  <p>Pendiente</p>
                </div>
              )}
            </TableCell>
            <TableCell>
              <div className="relative flex items-center gap-4">
                {admin && (
                  <Tooltip content="Editar">
                    <button
                      onClick={() => handleModalEditTask(task)}
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    >
                      <EditIcon />
                    </button>
                  </Tooltip>
                )}

                {task.state ? (
                  <Tooltip content="Cancelar">
                    <button
                      onClick={() => taskComplete(task._id)}
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                    >
                      <CancelTask />
                    </button>
                  </Tooltip>
                ) : (
                  <Tooltip content="Completar">
                    <button
                      onClick={() => taskComplete(task._id)}
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    >
                      <CheckTask className="text-success" />
                    </button>
                  </Tooltip>
                )}

                {admin && (
                  <Tooltip color="danger" content="Eliminar">
                    <button
                      onClick={() => handleModalDeleteTask(task)}
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

TaskTable.propTypes = {
  tasks: PropTypes.array,
};
