import { Card, HeadComp } from "@/components";
import { useAuth } from "@/context";
import { WithAuth, WithoutAuth } from "@/hooks";
import * as Chakra from "@chakra-ui/react";
import { MdDashboardCustomize } from "react-icons/md";
import { BsFillEnvelopePaperFill } from "react-icons/bs";
import { FaMoneyCheckAlt, FaQuestionCircle } from "react-icons/fa";
import { SiMaterialdesign } from "react-icons/si";

const Home = () => {
  const auth = useAuth();

  console.log(auth);

  return (
    <Chakra.Flex p={10} direction="column" align="center" justify="center">
      <HeadComp title="Sistema faz-tudo" />
      <Chakra.Heading as="h1" size="xl" textAlign="center" mb={3}>
        Bem-vindo {auth.username} ao Sistema PMAL New
      </Chakra.Heading>
      <Chakra.Text fontSize="lg" textAlign="center">
        Aqui você pode gerenciar algumas coisas importantes
      </Chakra.Text>
      <Chakra.Wrap w="full" spacing={5} my={10} justify={["center", "center", "start"]}>
        <Card
          href="/tco"
          title="TCO"
          subtitle="Aqui é o gerenciador de TCO"
          bg="green.600"
          icon={<BsFillEnvelopePaperFill fontSize="50px" color="white" />}
        />
        <Card
          href="/materials"
          title="Apreensão de materiais"
          subtitle="Gerenciamento de apreensão de materiais na PMAL"
          bg="orange.500"
          icon={<SiMaterialdesign fontSize="50px" color="white" />}
        />
      </Chakra.Wrap>
    </Chakra.Flex>
  );
};

export default WithAuth(Home);
