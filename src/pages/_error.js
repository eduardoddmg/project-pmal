import { HeadComp } from "@/components";
import { Box, Heading, Text } from "@chakra-ui/react"; // Importe os componentes do Chakra UI ou a biblioteca que você está usando
import Head from "next/head";

const Error = () => {
  return (
    <>
      <HeadComp title="Error 404" description="Página não encontrada" />
      <Box textAlign="center" mt="20">
        <Heading as="h1" size="xl">
          Aconteceu algum erro
        </Heading>
        <Text mt="4">
          Aconteceu algum tipo de erro. O erro será sanado em breve.
        </Text>
      </Box>
    </>
  );
};

export default Error;
