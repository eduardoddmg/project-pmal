import React from "react";
import { saveAs } from "file-saver";
import { Box, Button, Heading, Icon, VStack, Wrap } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { WithAuth } from "@/hooks";
import { HeadComp } from "@/components";

const files = [
  {
    name: "Mapa TCO atualizado [colorido]",
    url: "/files/mapa-colorido.pdf",
    color: "green.500",
  },
  {
    name: "Mapa TCO atualizado [preto e branco]",
    url: "/files/mapa-pb.pdf",
    color: "yellow.500",
  },
];

const Page = () => {
  const handleDownload = (file) => {
    saveAs(file.url, `${file.name}.pdf`);
  };

  return (
    <Wrap w="full" spacing={5} mx={5} my={10} justify={["center", "center", "start"]}>
        <HeadComp title="Mapas" />
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
          <Icon as={DownloadIcon} fontSize="45px" />
          <Heading color="white">{file.name}</Heading>
        </VStack>
      ))}
    </Wrap>
  );
};

export default WithAuth(Page);
