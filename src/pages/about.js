import { HeadComp } from "@/components";
import { WithAuth } from "@/hooks";
import * as Chakra from "@chakra-ui/react";

export const About = () => {
  return (
    <Chakra.Stack p={10} textAlign="center">
      <HeadComp title="Sobre" />
      <Chakra.Heading as="h1" mb={4} fontSize="2xl" textAlign="center">
        Sobre o Nosso Sistema TCO
      </Chakra.Heading>
      <Chakra.Text mb={4} fontWeight="bold">
        Coordenador
      </Chakra.Text>
      <Chakra.Text mb={4} fontWeight="normal">
        TC Paulo Eugênio
      </Chakra.Text>
      <Chakra.Text mb={4} fontWeight="bold">
        Desenvolvimento
      </Chakra.Text>
      <Chakra.Text mb={4} fontWeight="normal">
        Aluno CFP Carlos Eduardo
      </Chakra.Text>
      <Chakra.Text mb={4} fontWeight="normal">
        Aluno CFP Maria
      </Chakra.Text>
    </Chakra.Stack>
  );
};

export default WithAuth(About)