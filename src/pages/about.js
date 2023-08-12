import { HeadComp } from "@/components";
import { WithAuth } from "@/hooks";
import * as Chakra from "@chakra-ui/react";

export const About = () => {
  return (
    <Chakra.Stack p={10}>
      <HeadComp title="Sobre" />
      <Chakra.Heading as="h1" mb={4} fontSize="2xl" textAlign="center">
        Sobre o Nosso Sistema Incrível
      </Chakra.Heading>
      <Chakra.Text mb={4}>
        Bem-vindo ao nosso mundo digital onde a inovação e a praticidade se
        encontram! Aqui no nosso sistema, estamos em uma busca incansável para
        simplificar a sua vida, oferecendo uma experiência única e eficiente.
      </Chakra.Text>
      <Chakra.Text mb={4}>
        Nossa equipe dedicada trabalha arduamente para criar soluções
        inteligentes que atendam às suas necessidades. Estamos sempre um passo à
        frente, antecipando o que você precisa antes mesmo de você perceber.
      </Chakra.Text>
      <Chakra.Text mb={4}>
        Com uma interface intuitiva e elegante, nosso sistema foi desenvolvido
        para ser fácil de usar, proporcionando uma navegação fluida e agradável.
        Com ele, você terá acesso a recursos poderosos que vão revolucionar a
        forma como você realiza suas tarefas diárias.
      </Chakra.Text>
      <Chakra.Text mb={4}>
        Acreditamos que a tecnologia pode simplificar a sua vida, e é por isso
        que estamos comprometidos em fornecer soluções de ponta que ajudem você
        a alcançar mais em menos tempo. Nosso sistema é o resultado dessa paixão
        e compromisso.
      </Chakra.Text>
      <Chakra.Text mb={4}>
        Então, junte-se a nós nessa jornada de descobertas e transformação.
        Experimente nosso sistema e descubra como podemos tornar sua vida mais
        fácil, eficiente e emocionante.
      </Chakra.Text>
      <Chakra.Text mb={4}>
        Obrigado por escolher nosso sistema. Estamos empolgados para fazer parte
        da sua história de sucesso!
      </Chakra.Text>
    </Chakra.Stack>
  );
};

export default WithAuth(About)