import { Card, HeadComp } from "@/components";
import { useAuth } from "@/context";
import { WithAuth } from "@/hooks";
import * as Chakra from "@chakra-ui/react";
import { BsFillEnvelopePaperFill } from "react-icons/bs";
import { SiAdminer } from "react-icons/si";

const Home = () => {
  const auth = useAuth();

  console.log(auth);

  const removeFirstChar = (str) =>
    str.charAt(0) === "0" ? str.substring(1) : str;

  return (
    <Chakra.Flex p={[2, 10]} direction="column" align="center" justify="center">
      <HeadComp title="TCO PMAL" />
      <Chakra.Image
        src={
          (auth.opm && `/logo/${auth.opm}.png`) ||
          (auth.comando && `/logo/${auth.comando}.png`) ||
          (auth.admin && "/logo/cpd.png")
        }
        boxSize="150px"
        objectFit="contain"
        pb={5}
      />
      <Chakra.Heading as="h1" size="xl" textAlign="center" mb={3}>
        {(auth.opm && removeFirstChar(auth.opm)) ||
          auth.comando ||
          (auth.admin && "ADMINISTRADOR")}
      </Chakra.Heading>
      <Chakra.Text fontSize="lg" textAlign="center">
        Aqui você pode gerenciar algumas coisas importantes
      </Chakra.Text>
      <Chakra.Wrap
        w="full"
        spacing={5}
        my={10}
        justify={["center", "center", "start"]}
      >
        <Card
          href="/tco"
          title="TCO"
          subtitle="Aqui é o gerenciador de TCO"
          bg="green.600"
          icon={<BsFillEnvelopePaperFill fontSize="50px" color="white" />}
        />
        {auth.admin && (
          <Card
            href="/admin"
            title="Controle do administrador"
            subtitle="Controle todo o workflow do sistema"
            bg="purple.500"
            icon={<SiAdminer fontSize="50px" color="white" />}
          />
        )}
      </Chakra.Wrap>
    </Chakra.Flex>
  );
};

export default WithAuth(Home);
