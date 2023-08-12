import { HeadComp } from '@/components';
import { Box, Heading, Text } from '@chakra-ui/react'; // Importe os componentes do Chakra UI ou a biblioteca que você está usando
import Head from 'next/head';

const Custom404 = () => {
  return (
    <>
    <HeadComp title="Error 404" description="Página não encontrada" />
    <Box textAlign="center" mt="20">
      <Heading as="h1" size="xl">
        Página não encontrada
      </Heading>
      <Text mt="4">A página que você está procurando não foi encontrada.</Text>
    </Box>
    </>
  );
};

export default Custom404;
