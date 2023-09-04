import { useToast } from "@chakra-ui/react";

export const showModal = (title, status) => {
  const toast = useToast();
  toast({
    title,
    status,
    duration: 9000,
    isClosable: true,
  });
};
