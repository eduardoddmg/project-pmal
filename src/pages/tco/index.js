import {
  ButtonLink,
  Table,
  HeadComp,
  CardValue,
  Select,
  ModalFilterTco,
  showModal,
} from "@/components";
import { readAll, remove as removeDoc } from "@/firebase";
import { WithAuth } from "@/hooks";
import React, { useEffect, useState } from "react";
import * as Chakra from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiRefreshCcw } from "react-icons/fi";
import {
  AiFillFileExcel,
  AiFillFilePdf,
  AiFillFilter,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { parseDateToEn, columnsTco, cards } from "@/utils";
import queryString from "query-string";
import { CSVLink } from "react-csv";
import { useForm } from "react-hook-form";
import opm from "@/data/opm";
import { useAuth } from "@/context";
import { IoMdClose } from "react-icons/io";
import { parse } from "dotenv";
import { organograma } from "@/data";
import sortArray from "sort-array";
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
    fontSize: "10px"
  },
  containerPrincipal: {
    flexDirection: "row",
  },
  containerTextPrincipal: {
    width: "50%",
    padding: 10,
    justifyContent: "center",
    backgroundColor: "#E2E8F0",
  },
  containerTextSecondary: {
    width: "50%",
    padding: 10,
    justifyContent: "center",
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
      heading: "Latitude",
      accessor: "lat"
    },
    {
      heading: "Longitude",
      accessor: "long"
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
    {data?.map(item => <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={{ marginBottom: 40 }}>
          <Text style={{ textAlign: "center" }}>TCO - {item?.n_tco}</Text>
        </View>
        {dataCards?.map(card => <View style={styles.containerPrincipal}>
          <View style={styles.containerTextPrincipal}>
            <Text style={styles.text}>{card.heading}</Text>
          </View>
          <View style={styles.containerTextSecondary}>
            <Text style={styles.text}>{item?.[card.accessor]}</Text>
          </View>
        </View>)}
      </View>
    </Page>)}
  </Document>
)};

const TcoPage = () => {
  const [tcoList, setTcoList] = useState(null);
  const [tcoListFilter, setTcoListFilter] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showCards, setShowCards] = Chakra.useBoolean();

  const auth = useAuth();

  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    const result = await readAll("tco");
    const subs = auth.comando
      ? organograma.find((item) => item.name === auth.comando).sub
      : [auth.opm];
    result.map(item => item.n_tco = parseInt(item.n_tco))
    setTcoList(
      auth.admin
        ? sortArray(result, {
          by: ["responsavel_peticionamento", "n_tco"],
          order: ["asc", "asc"],
        })
        : sortArray(result, {
          by: ["responsavel_peticionamento", "n_tco"],
          order: ["asc", "asc"],
        })
            .filter((item) => subs.includes(item.responsavel_peticionamento))
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const view = (id) => router.push(`/tco/${id}`);

  const edit = (data) => {
    data.date = parseDateToEn(data.date);

    router.push(`/tco/form?${queryString.stringify(data)}`);
    // const url = `/tco/form?${queryString.stringify(data)}`;
   // window.open(url, "_blank");

  };
  const remove = (id) => {
    removeDoc("tco", id);
    fetchData();
  };

  return (
    <Chakra.Stack p={5}>
      <HeadComp title="TCO PMAL" />
      <Chakra.Button
        display={loading && "none"}
        leftIcon={showCards ? <IoMdClose /> : <AiOutlinePlusCircle />}
        colorScheme={showCards ? "red" : "green"}
        alignSelf="start"
        onClick={setShowCards.toggle}
      >
        {showCards ? "Ocultar cartões" : "Ver cartões"}
      </Chakra.Button>
      {showCards && (
        <Chakra.Wrap>
          {cards.map((card, index) => (
            <CardValue
              key={index}
              color={card.color}
              title={card.title}
              value={card.value(tcoList)}
            />
          ))}
        </Chakra.Wrap>
      )}
      <Chakra.HStack>
        <ButtonLink colorScheme="green" alignSelf="start" href="/tco/form">
          Criar
        </ButtonLink>
        <Chakra.Button onClick={fetchData}>
          <FiRefreshCcw />
        </Chakra.Button>
        <PDFDownloadLink
        document={<MyPdfDocument data={tcoList} />}
        fileName={"TCO relatorio.pdf"}
      >
        <Chakra.Button
          alignSelf="start"
          colorScheme="red"
          rightIcon={<AiFillFilePdf />}
        >
          PDF
        </Chakra.Button>
      </PDFDownloadLink>
      </Chakra.HStack>
      <Table
        variant="striped"
        colorScheme="gray"
        loading={loading}
        data={tcoList}
        columns={columnsTco}
        view={view}
        edit={edit}
        remove={remove}
        showActions
      />
    </Chakra.Stack>
  );
};

export default WithAuth(TcoPage);
