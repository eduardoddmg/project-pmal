import * as Chakra from "@chakra-ui/react";
import { Input, Select } from "./input";
import { useForm } from "react-hook-form";
import { filterByValue } from "@/utils";

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

export const ModalImage = ({ url, isOpen, onClose, onOpen }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <Chakra.Image src={url} />
    </Modal>
  );
};

export const ModalFilterTco = ({
  opms,
  isOpen,
  onClose,
  onOpen,
  tcoList,
  setTcoList,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    setTcoList(filterByValue(tcoList, data));
    console.log(filterByValue(tcoList, data));
    console.log(data);
    onClose();
    reset();
  };

  return (
    <Modal title="Filtro TCO" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <Chakra.Stack as="form" onSubmit={handleSubmit(onSubmit)}>
        <Select {...register("responsavel_peticionamento")} title="OPM">
          <option value="">{"Selecione"}</option>
          {opms.map((opm, index) => (
            <option key={index} value={opm}>
              {opm}
            </option>
          ))}
        </Select>
        <Input
          title="Data"
          type="text"
          errors={errors?.date}
          {...register("date")}
        />
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
        <Chakra.Button colorScheme="blue" type="submit">
          Enviar
        </Chakra.Button>
      </Chakra.Stack>
    </Modal>
  );
};
