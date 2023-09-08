import { readOne, remove as removeDoc } from "@/firebase";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as Chakra from "@chakra-ui/react";
import { WithAuth } from "@/hooks";
import { Loading } from "@/components";
import queryString from "query-string";


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

const PageId = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    const result = await readOne("users", router.query.id);
    setData(result);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const remove = async () => {
    setLoading(true);
    await removeDoc("users", router.query.id);
    router.push("/admin/users");
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <Chakra.Stack p={5}>
      <Card heading="Email" text={data?.email} />
      <Card heading="Tipo" text={data?.role} />
      <Card heading="OPM" text={data?.opm || "Inexistente"} />
      <Card heading="Comandos" text={data?.comandos || "Inexistente"} />
      <Chakra.Wrap>
        <Chakra.Button onClick={() => router.push("/admin/users")}>
          Voltar
        </Chakra.Button>
        <Chakra.Button onClick={remove} colorScheme="red">
          Apagar
        </Chakra.Button>
      </Chakra.Wrap>
    </Chakra.Stack>
  );
};

export default PageId;
