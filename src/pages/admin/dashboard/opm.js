import {
  AreaChart,
  BarChart,
  CardValue,
  DonutChart,
  Table,
} from "@/components";
import { opms, organograma } from "@/data";
import { readAll } from "@/firebase";
import { WithAuth } from "@/hooks";
import { cards, columns, funcs } from "@/utils";
import {
  Center,
  Flex,
  HStack,
  Heading,
  Stack,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import sortArray from "sort-array";
import new_cidades from "@/data/new_cidades"

const Page = () => {
  const [tco, setTco] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const result = await readAll("tco");

    const opms = [...new Set(result.map((item) => item.responsavel_peticionamento))];
    const allOpms = organograma.map((item) => item.sub).flat();

    const statsOpm = opms.map((opm) => {
      const filter = result.filter(
        (item) => item.responsavel_peticionamento === opm
      );
      return {
        name: opm,
        Distância: funcs.sum_dist(filter),
        Duração: funcs.sum_time(filter),
        Gasolina: (funcs.sum_dist(filter) / 11),
        Quantidade: filter.length,
      };
    });

    const statsAllOpms = allOpms.map((opm) => {
      const filter = result.filter(
        (item) => item.responsavel_peticionamento === opm
      );

      const item = new_cidades.find(cidade => cidade.name === opm);
      console.log(item?.sub[0]);

      return {
        name: `${opm} (${item?.sub[0]})`,
        Distância: funcs.sum_dist(filter).toFixed(1),
        Duração: funcs.sum_time(filter).toFixed(1),
        Gasolina: (funcs.sum_dist(filter) / 11).toFixed(1),
        Quantidade: filter.length,
      };
    });

    setStatistics(statsOpm);

    setTco(sortArray(statsAllOpms, {
      by: "Quantidade",
      order: "desc",
    }));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const valueFormatter = (number) =>
    `${Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(number)
      .toString()}`;

  console.log(tco);
  console.log(statistics);

  const columns = [
    {
      Header: "OPM",
      accessor: "name",
    },
    {
      Header: "Quantidade",
      accessor: "Quantidade",
    },
    {
      Header: "Distãncia",
      accessor: "Distância",
    },
    {
      Header: "Duração",
      accessor: "Duração",
    },
    {
      Header: "Gasolina",
      accessor: "Gasolina",
    },
  ];

  return (
    <VStack p={5} spacing={10}>
      <Heading>Dashboard</Heading>
      {statistics && (
        <Flex w="full" justifyContent="space-between" wrap="wrap" gap={5}>
          <Table loading={loading} data={tco} columns={columns} />
          <Stack w={["100%", "48%"]}>
            <DonutChart
              show
              loading={loading}
              data={statistics}
              title="Distância (km)"
              category="Distância"
              valueFormatter={valueFormatter}
            />
          </Stack>
          <Stack w={["100%", "48%"]}>
            <DonutChart
              show
              loading={loading}
              data={statistics}
              title="Tempo (min)"
              category="Duração"
              valueFormatter={valueFormatter}
            />
          </Stack>
          <Stack w={["100%", "48%"]}>
            <DonutChart
              show
              loading={loading}
              data={statistics}
              title="Gasolina"
              category="Gasolina"
              valueFormatter={valueFormatter}
            />
          </Stack>
          <Stack w={["100%", "48%"]}>
            <DonutChart
              show
              loading={loading}
              data={statistics}
              title="Contagem TCO"
              category="Quantidade"
              valueFormatter={valueFormatter}
            />
          </Stack>
        </Flex>
      )}
      <BarChart
        show
        loading={loading}
        title="Economia"
        subtitle="Acompanhe o gráfico da economia da implantação do TCO"
        data={statistics}
        categories={["Distância", "Duração", "Gasolina", "Contagem"]}
        colors={["blue", "red", "yellow", "green"]}
        dataFormatter={valueFormatter}
      />
    </VStack>
  );
};

export default WithAuth(Page);
