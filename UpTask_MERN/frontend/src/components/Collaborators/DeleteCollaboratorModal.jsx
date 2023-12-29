import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import useProjects from '../../hooks/useProjects';
import { InfoIcon } from '../Task/InfoIcon';

const DeleteCollaboratorModal = () => {
  const {
    deleteCollaboratorModal,
    handleDeleteCollaboratorModal,
    deleteCollaborator,
  } = useProjects();

  return (
    <Modal
      backdrop="blur"
      isOpen={deleteCollaboratorModal}
      onClose={handleDeleteCollaboratorModal}
      placement="center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="font-normal flex gap-4 bg-[#DC3545]">
              <InfoIcon className="text-white" />
              <p className="text-white">Eliminar Colaborador</p>
            </ModalHeader>
            <Divider />
            <ModalBody>
              <p className="mt-4">
                Ten en cuenta que una vez se elimine al colaborador, este ya no
                podrá acceder al proyecto.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" className="rounded-3xl" onPress={onClose}>
                Cancelar
              </Button>
              <Button
                color="primary"
                className="rounded-3xl"
                onClick={deleteCollaborator}
              >
                Eliminar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteCollaboratorModal;
