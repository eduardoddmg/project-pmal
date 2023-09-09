import { readOne, remove as removeDoc } from "@/firebase";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as Chakra from "@chakra-ui/react";
import { WithAuth } from "@/hooks";
import { HeadComp, Loading, ModalImage } from "@/components";
import { AiFillFilePdf } from "react-icons/ai";
import {
  PDFDownloadLink,
  Page,
  Text,
  Document,
  View,
} from "@react-pdf/renderer";
import { parseDateToEn } from "@/utils";
import queryString from "query-string";

const MyPdfDocument = ({ data }) => (
  <Document>
    <Page>
      <View>
        <Text>Infração penal: {data?.infracao_penal}</Text>
        <Text>Cidade: {data?.city}</Text>
        <Text>Bairro: {data?.bairro}</Text>
        <Text>Delegacia: {data?.delegacia}</Text>
        <Text>Distância: {data?.dist.toFixed(0)} KM</Text>
        <Text>Número do processo: {data?.n_process}</Text>
        <Text>Número do TCO: {data?.n_tco}</Text>
      </View>
    </Page>
  </Document>
);

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

  const modalSignature = Chakra.useDisclosure();
  const modalAutor = Chakra.useDisclosure();

  const fetchData = async () => {
    setLoading(true);

    const result = await readOne("tco", router.query.id);
    setData(result);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const edit = () => {

    data.date = parseDateToEn(data.date);
    data.id = router.query.id;

    router.push(`/tco/form?${queryString.stringify(data)}`);
  };
  const remove = async () => {
    setLoading(true);
    await removeDoc("tco", router.query.id);
    router.push("/tco");
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <Chakra.Stack p={5}>
      <HeadComp title="TCO PMAL" />
      <ModalImage
        url={data?.imgUrl}
        onOpen={modalAutor.onOpen}
        isOpen={modalAutor.isOpen}
        onClose={modalAutor.onClose}
      />
      <ModalImage
        url={data?.signatureImgUrl}
        onOpen={modalSignature.onOpen}
        isOpen={modalSignature.isOpen}
        onClose={modalSignature.onClose}
      />
      <Card heading="Infração penal" text={data?.infracao_penal} />
      <Card heading="Cidade" text={data?.city} />
      <Card heading="Bairro" text={data?.bairro} />
      <Card heading="Delegacia" text={data?.delegacia} />
      <Card heading="Distância" text={data?.dist.toFixed(0) + " KM"} />
      <Card heading="Número do processo" text={data?.n_process} />
      <Card heading="Número do TCO" text={data?.n_tco} />
      <Chakra.Image
        boxSize="200px"
        objectFit="cover"
        cursor="pointer"
        src={data?.imgUrl}
        onClick={modalAutor.onOpen}
      />
      <Chakra.Image
        objectFit="cover"
        cursor="pointer"
        src={data?.signatureImgUrl}
        onClick={modalSignature.onOpen}
      />
      <Chakra.Wrap>
        <Chakra.Button onClick={() => router.push("/tco")}>
          Voltar
        </Chakra.Button>
        <Chakra.Button onClick={edit} colorScheme="orange">
          Editar
        </Chakra.Button>
        <Chakra.Button onClick={remove} colorScheme="red">
          Apagar
        </Chakra.Button>
      </Chakra.Wrap>
    </Chakra.Stack>
  );
};

export default WithAuth(PageId);
