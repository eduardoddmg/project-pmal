import { readOne, remove as removeDoc } from "@/firebase";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as Chakra from "@chakra-ui/react";
import { WithAuth } from "@/hooks";
import { HeadComp, Loading, ModalImage } from "@/components";
import { AiFillFilePdf } from "react-icons/ai";
import { parseDateToEn } from "@/utils";
import queryString from "query-string";
import {
  PDFDownloadLink,
  Page,
  Text,
  Document,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  section: {
    flexDirection: "column",
    gap: 10,
    margin: 10,
    padding: 10,
  },
  heading: {
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
  text: {
    marginBottom: 10,
  },
  containerPrincipal: {
    flexDirection: "row",
  },
  containerTextPrincipal: {
    width: "50%",
    padding: 20,
    backgroundColor: "#E2E8F0",
  },
  containerTextSecondary: {
    width: "50%",
    padding: 20,
    backgroundColor: "#EDF2F7",
  },
});

const MyPdfDocument = ({ data }) => { 
  const dataCards = [
    {
      heading: "Infração Penal",
      accessor: "infracao_penal"
    },
     {
      heading: "Cidade",
      accessor: "city"
    },
     {
      heading: "Bairro",
      accessor: "bairro"
    },
     {
      heading: "Delegacia",
      accessor: "delegacia"
    },
     {
      heading: "Distância (KM)",
      accessor: "dist"
    },
     {
      heading: "Número do processo",
      accessor: "n_process"
    },
    {
      heading: "Número do TCO",
      accessor: "n_tco"
    },
  ]
  return (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <View style={{ marginBottom: 40 }}>
          <Text style={{ textAlign: "center" }}>TCO - {data?.n_tco}</Text>
        </View>
        {dataCards?.map(item => <View style={styles.containerPrincipal}>
          <View style={styles.containerTextPrincipal}>
            <Text>{item.heading}</Text>
          </View>
          <View style={styles.containerTextSecondary}>
            <Text>{data?.[item.accessor]}</Text>
          </View>
        </View>)}
      </View>
    </Page>
  </Document>
)};

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
    result.dist = result.dist.toFixed(1);
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
      <PDFDownloadLink
        document={<MyPdfDocument data={data} />}
        fileName={"TCO " + data?.n_tco + ".pdf"}
      >
        <Chakra.Button
          alignSelf="start"
          colorScheme="red"
          rightIcon={<AiFillFilePdf />}
        >
          PDF
        </Chakra.Button>
      </PDFDownloadLink>
      <Card heading="Infração penal" text={data?.infracao_penal} />
      <Card heading="Hora" text={data?.hour} />
      <Card heading="Minutos" text={data?.minute} />
      <Card heading="Cidade" text={data?.city} />
      <Card heading="Bairro" text={data?.bairro} />
      <Card heading="Delegacia" text={data?.delegacia} />
      <Card heading="Distância" text={data?.dist + " KM"} />
      <Card heading="Número do processo" text={data?.n_process} />
      <Card heading="Número do TCO" text={data?.n_tco} />
      <Card heading="Apreensão de material" text={data?.apreensao_material} />
      <Card heading="Depósito" text={data?.deposito} />
      <Card heading="Status" text={data?.status} />
      <Card heading="Juizados" text={data?.juizados} />
      <Card heading="Nome do PM" text={data?.pm_name} />
      <Card heading="Matrícula do PM" text={data?.pm_mat} />
      <Chakra.Text>Imagem PM</Chakra.Text>
      <Chakra.Image
        boxSize="200px"
        objectFit="cover"
        cursor="pointer"
        src={
          data?.imgUrl ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStYIhir1P4o-L9RV-U9_Q1CAja0IfnFE5i2w&usqp=CAU"
        }
        onClick={modalAutor.onOpen}
      />
      <Chakra.Text>Assinatura PM</Chakra.Text>
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
