import { useEffect, useState } from "react";
import { readAll, readOne } from "@/firebase";
import { useAuth } from "@/context";
import { WithAuth } from "@/hooks";
import * as Chakra from "@chakra-ui/react";
import { ButtonLink, HeadComp, Loading } from "@/components";

const Card = ({ heading, text }) => {
  return (
    <Chakra.Wrap w={["100%", "80%"]} py={2} spacing={0}>
      <Chakra.Text
        fontWeight="bold"
        py={5}
        px={3}
        w={["100%", "50%"]}
        bg="gray.200"
      >
        {heading}
      </Chakra.Text>
      <Chakra.Text py={5} px={3} w={["100%", "50%"]} bg="gray.100">
        {text || "Não registrado"}
      </Chakra.Text>
    </Chakra.Wrap>
  );
};

const Personal = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = useAuth();

  const fetchData = async () => {
    setLoading(true);
    const result = await readAll("users");
    const item = result.find((item) => item.idUser === auth.token);
    setData(item);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(loading);

  if (loading)
    return (
      <>
      <HeadComp title="Carregando..." />
        <Loading />;
      </>
    );
  if (!loading)
    return (
      <Chakra.Stack p={5}>
      <HeadComp title="Dados pessoais" />
        <Chakra.Image
          boxSize="200px"
          borderRadius="100%"
          objectFit="cover"
          src={data.imgUrl}
        />
        <Card heading="Nome" text={data?.name} />
        <Card heading="Endereço" text={data?.address} />
        <Card heading="Idade" text={data?.age} />
        <ButtonLink
          alignSelf="start"
          colorScheme="orange"
          borderRadius={0}
          href={`/personal/form?name=${data?.name}&address=${data?.address}&age=${data?.age}&id=${data?.id}&img=${data?.imgUrl}`}
        >
          Editar
        </ButtonLink>
      </Chakra.Stack>
    );
};

export default WithAuth(Personal);
