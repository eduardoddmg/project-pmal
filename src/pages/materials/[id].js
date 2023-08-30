import { readOne, remove as removeDoc } from "@/firebase";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as Chakra from "@chakra-ui/react";
import { WithAuth } from "@/hooks";
import { Loading } from "@/components";
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
        <Text>Distância: {data?.dist?.toFixed(0)} KM</Text>
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

  const fetchData = async () => {
    setLoading(true);

    const result = await readOne("materials", router.query.id);
    setData(result);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const edit = () => {
    const parsed = {
      id: data.id,
      date_tco: parseDateToEn(data.date_tco),
      date_peticionamento: parseDateToEn(data.date_peticionamento),
      date_liberacao: parseDateToEn(data.date_liberacao),
      city: data.city,
      n_tco: data.n_tco,
      pm_name: data.pm_name,
      pm_mat: data.pm_mat,
      unidade_origem: data.unidade_origem,
      infracao_penal: data.infracao_penal,
      autor: data.autor,
      n_process: data.n_process,
      name_material: data.n_process,
      description_material: data.description_material,
      local_material: data.local_material,
      decisao: data.decisao,
      local_material_liberacao: data.local_material_liberacao,
    };

    router.push(`/materials/form?${queryString.stringify(parsed)}`);
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
      <PDFDownloadLink
        document={<MyPdfDocument data={data} />}
        fileName="report.pdf"
      >
        <Chakra.Button
          alignSelf="start"
          colorScheme="red"
          rightIcon={<AiFillFilePdf />}
        >
          PDF
        </Chakra.Button>
      </PDFDownloadLink>
      <Card heading="Cidade" text={data?.city} />
      <Card heading="Número TCO" text={data?.n_tco} />
      <Card heading="Data TCO" text={data?.date_tco} />
      <Card heading="PM Responsável - Nome" text={data?.pm_name} />
      <Card heading="PM Responsável - Matricula" text={data?.pm_mat} />
      <Card heading="Unidade de origem" text={data?.unidade_origem} />
      <Card heading="Infração penal" text={data?.infracao_penal} />
      <Card heading="Autor" text={data?.autor} />
      <Card heading="Juizo de destino" text={data?.juizo_destino} />
      <Card heading="Data peticionamento" text={data?.date_peticionamento} />
      <Card heading="Nº processo judicial" text={data?.n_process} />
      <Card heading="Nome material" text={data?.name_material} />
      <Card heading="Descrição material" text={data?.description_material} />
      <Card heading="Local" text={data?.local_liberacao} />
      <Card heading="Decisão" text={data?.decisao} />
      <Card heading="Data Liberação" text={data?.date_liberacao} />
      <Card heading="Local Liberação" text={data?.local_material_liberacao} />

      <Chakra.Wrap>
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
