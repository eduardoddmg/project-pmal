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
  
  const Page = () => {
    const [tco, setTco] = useState(null);
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const fetchData = async () => {
      setLoading(true);
      const result = await readAll("tco");
  
      const opms = [...new Set(result.map((item) => item.responsavel_peticionamento))];
  
      const x = opms.map((opm) => {
        const filter = result.filter((item) => item.responsavel_peticionamento === opm);
        return {
          name: opm,
          "Distância": funcs.sum_dist(filter),
          "Duração": funcs.sum_time(filter),
          "Gasolina": funcs.sum_dist(filter) / 11,
          "Quantidade": filter.length,
        };
      });
  
      console.log(x);
  
      setStatistics(x);
  
      setTco(result);
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
  
    return (
      <VStack p={5} spacing={10}>
        <Heading>Dashboard</Heading>
        {statistics && (
          <Flex w="full" justifyContent="space-between" wrap="wrap" gap={5}>
            <Stack w="48%">
              <DonutChart
                show
                loading={loading}
                data={statistics}
                title="Distância (km)"
                category="Distância"
                valueFormatter={valueFormatter}
              />
            </Stack>
            <Stack w="48%">
              <DonutChart
                show
                loading={loading}
                data={statistics}
                title="Tempo (min)"
                category="Duração"
                valueFormatter={valueFormatter}
              />
            </Stack>
            <Stack w="48%">
              <DonutChart
                show
                loading={loading}
                data={statistics}
                title="Gasolina"
                category="Gasolina"
                valueFormatter={valueFormatter}
              />
            </Stack>
            <Stack w="48%">
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
  