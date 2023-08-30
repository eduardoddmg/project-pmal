import {
  Accordion,
  AreaChart,
  BarChart,
  CardValue,
  DonutChart,
  Table,
} from "@/components";
import { opms } from "@/data";
import { readAll } from "@/firebase";
import { WithAuth } from "@/hooks";
import {
  cards,
  columns,
  columnsTco,
  formatDateToMonthYear,
  funcs,
  removeDuplicatesByField,
} from "@/utils";
import {
  Flex,
  HStack,
  Stack,
  Wrap,
  SimpleGrid,
  useBoolean,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsPlusSquare } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { SiOpenai, SiOpenid } from "react-icons/si";

const Page = () => {
  const [tcoList, setTcoList] = useState(null);
  const [loading, setLoading] = useState(true);

  const [show, setShow] = useBoolean();

  const fetchData = async () => {
    setLoading(true);
    const result = await readAll("tco");
    console.log(result);
    setTcoList(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const opmsCurrent = (name) => opms.find((opm) => opm.name === name).sub;
  const tcoFilter = (name) =>
    tcoList?.filter((item) =>
      opmsCurrent(name).includes(item.responsavel_peticionamento)
    );
  console.log(tcoList && tcoFilter("CPC"));

  const batalhoes =
    tcoList &&
    removeDuplicatesByField(
      tcoFilter("CPC").map((item) => ({
        name: item.responsavel_peticionamento,
        date: item.date,
        Gasolina: tcoList
          ? funcs.sum_dist(tcoFilter(item.responsavel_peticionamento)) / 11
          : 0,
        Distância: tcoList
          ? funcs.sum_dist(tcoFilter(item.responsavel_peticionamento))
          : 0,
        Dinheiro: tcoList
          ? (funcs.sum_dist(tcoFilter(item.responsavel_peticionamento)) * 5) /
            11
          : 0,
        Tempo: tcoList
          ? funcs.sum_time(tcoFilter(item.responsavel_peticionamento))
          : 0,
      })),
      "name"
    );

  console.log(batalhoes);

  const valueFormatter = (number) =>
    `${Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(number)
      .toString()}`;

  return (
    <Stack spacing={5} m={5}>
      <Button leftIcon={<FiRefreshCcw />} alignSelf="start" onClick={fetchData}>Atualizar</Button>
      <Wrap>
        {cards.map((card, index) => (
          <CardValue
            key={index}
            color={card.color}
            title={card.title}
            value={loading ? 0 :  card.value(tcoFilter("CPC"))}
          />
        ))}
      </Wrap>
      <Table
        variant="striped"
        colorScheme="gray"
        loading={loading}
        data={tcoFilter("CPC")}
        columns={columnsTco}
        showActions={false}
      />
      <Button
        display={loading && "none"}
        leftIcon={show ? <IoMdClose /> : <AiOutlinePlusCircle />}
        colorScheme={show ? "red" : "green"}
        alignSelf="start"
        onClick={setShow.toggle}
      >
        {show ? "Ocultar gráficos" : "Ver gráficos"}
      </Button>
      {batalhoes && (
        <SimpleGrid columns={2} spacing={5} justify="space-between">
          <DonutChart
            show={show}
            loading={loading}
            title="Gasolina (Litros)"
            data={batalhoes}
            category="Gasolina"
            valueFormatter={valueFormatter}
          />
          <DonutChart
            show={show}
            loading={loading}
            title="Distância (KM)"
            data={batalhoes}
            category="Distância"
            valueFormatter={valueFormatter}
          />
          <DonutChart
            show={show}
            loading={loading}
            title="Dinheiro (R$)"
            data={batalhoes}
            category="Dinheiro"
            valueFormatter={valueFormatter}
          />
          <DonutChart
            show={show}
            loading={loading}
            title="Tempo (minutos)"
            data={batalhoes}
            category="Tempo"
            valueFormatter={valueFormatter}
          />
        </SimpleGrid>
      )}
      <BarChart
        show={show}
        loading={loading}
        title="Economia"
        subtitle="Acompanhe no gráfico abaixo a ecomia com a implantação do TCO"
        data={batalhoes}
        categories={["Dinheiro", "Tempo", "Distância", "Gasolina"]}
        colors={["blue", "green", "yellow", "orange"]}
        dataFormatter={valueFormatter}
      />
      <AreaChart
        show={show}
        loading={loading}
        title="Dashboard CPC"
        data={batalhoes}
        categories={["Distância", "Gasolina", "Tempo", "Dinheiro"]}
        colors={["orange", "blue", "red", "purple"]}
        dataFormatter={valueFormatter}
      />
    </Stack>
  );
};

export default WithAuth(Page);
