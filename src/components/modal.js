import * as Chakra from "@chakra-ui/react";
import { Input, Select } from "./input";
import { useForm } from "react-hook-form";

export const Modal = ({ title, isOpen, onClose, onOpen, children }) => {
  return (
    <>
      <Chakra.Modal isOpen={isOpen} onClose={onClose} size="xl">
        <Chakra.ModalOverlay />
        <Chakra.ModalContent>
          <Chakra.ModalHeader>{title}</Chakra.ModalHeader>
          <Chakra.ModalCloseButton />
          <Chakra.ModalBody>{children}</Chakra.ModalBody>
        </Chakra.ModalContent>
      </Chakra.Modal>
    </>
  );
};

export const ModalFilterTco = ({ opms, isOpen, onClose, onOpen }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  return (
    <Modal title="Filtro TCO" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <Chakra.Stack as="form">
        <Select {...register("opm")} title="OPM"> 
            {opms.map(opm => <option value={opm}>{opm}</option>)}
        </Select>
        <Input
          title="Nº TCO"
          type="text"
          errors={errors?.n_tco}
          {...register("n_tco")}
        />
        <Input
          title="Nº processo"
          type="text"
          errors={errors?.n_process}
          {...register("n_process")}
        />
        <Chakra.Button colorScheme="blue">
            Enviar
        </Chakra.Button>
      </Chakra.Stack>
    </Modal>
  );
};
