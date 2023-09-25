import React from "react";
import { saveAs } from "file-saver";
import { Box, Button, Heading, Icon, VStack, Wrap } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { WithAuth } from "@/hooks";
import { HeadComp } from "@/components";
import { FiMap, FiMapPin } from "react-icons/fi";
import { BsMap } from "react-icons/bs";
import { SiMapbox } from "react-icons/si";

const files = [
  {
    name: "Mapa TCO atualizado",
    url: "/files/mapa-pb.pdf",
    color: "green.500",
    icon: FiMap
  },
  {
    name: "TCO Agreste",
    url: "/files/agreste.pdf",
    color: "red.500",
    icon: BsMap
  },
  {
    name: "TCO Norte e Zona da Mata",
    url: "/files/norte-zonadamata.pdf",
    color: "purple.500",
    icon: FiMapPin
  },
  {
    name: "TCO Sul",
    url: "/files/sul.pdf",
    color: "yellow.500",
    icon: SiMapbox
  },
  {
    name: "TCO Sertão",
    url: "/files/sertao.pdf",
    color: "orange.500",
    icon: FiMap
  },
  {
    name: "TCO metropolitano",
    url: "/files/metropolitano.pdf",
    color: "blue.500",
    icon: FiMap
  },
  {
    name: "TCO geral",
    url: "/files/geral.pdf",
    color: "red.500",
    icon: FiMap
  },
  {
    name: "TCO comandos",
    url: "/files/comandos.pdf",
    color: "green.500",
    icon: FiMap
  },
];

const Page = () => {
  const handleDownload = (file) => {
    saveAs(file.url, `${file.name}.pdf`);
  };

  return (
    <VStack py={10} px={5}>
      <HeadComp title="Mapas" />
      <Heading as="h1" size="xl" textAlign="center" mb={3}>
        MAPAS
      </Heading>
      <Wrap
        w="full"
        spacing={5}
        mx={5}
        my={10}
        justifyContent={["center", "center", "space-between"]}
        alignContent="flex-start"
      >
        {files.map((file, index) => (
          <VStack
            key={index}
            w={["100%", "100%", "30%"]}
            cursor="pointer"
            onClick={() => handleDownload(file)}
            borderRadius={5}
            p={7}
            textAlign="center"
            color="white"
            bg={file.color}
          >
            <Icon as={file.icon} fontSize="45px" />
            <Heading color="white">{file.name}</Heading>
          </VStack>
        ))}
      </Wrap>
    </VStack>
  );
};

export default WithAuth(Page);
