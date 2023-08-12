import {
  Box,
  Button,
  ChakraProvider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { ButtonLink, ButtonLinkBack } from "./btn-link";
import { useAuth } from "@/context";
import { AiFillHome } from "react-icons/ai";
import { IoArrowBackOutline } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const auth = useAuth();

  if (auth.token)
    return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        p={4}
        bg="blue.500"
        color="white"
      >
        <HStack
          justify="space-between"
          p={2}
          spacing="10px"
          w="full"
        >
          <HStack>
            <ButtonLink variant="link" color="white" href="/">
              <AiFillHome style={{ fontSize: "25px" }} />
            </ButtonLink>
          </HStack>
          <HStack spacing={4}>
            <ButtonLink variant="link" color="white" onClick={auth.logout}>
              <FiLogOut style={{ fontSize: "25px" }} />
            </ButtonLink>
          </HStack>
        </HStack>
      </Flex>
    );
};
