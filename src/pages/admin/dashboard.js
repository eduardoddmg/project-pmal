import {
  AreaChart,
  BarChart,
  CardValue,
  DonutChart,
  Table,
} from "@/components";
import { opms } from "@/data";
import { readAll } from "@/firebase";
import { WithAuth } from "@/hooks";
import { cards, columns, funcs } from "@/utils";
import { Stack, Wrap } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Page = () => {
  const [tcoList, setTcoList] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const result = await readAll("tco");
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
  console.log(tcoFilter("CPC"));

  const comandos = [
    {
      name: "CPC",
      Gasolina: tcoList ? funcs.sum_dist(tcoFilter("CPC")) / 11 : 0,
      Distância: tcoList ? funcs.sum_dist(tcoFilter("CPC")) : 0,
      Dinheiro: tcoList ? (funcs.sum_dist(tcoFilter("CPC")) * 5) / 11 : 0,
      Tempo: tcoList ? funcs.sum_time(tcoFilter("CPC")) : 0,
    },
    {
      name: "CPI",
      Gasolina: tcoList ? funcs.sum_dist(tcoFilter("CPI")) / 11 : 0,
      Distância: tcoList ? funcs.sum_dist(tcoFilter("CPI")) : 0,
      Dinheiro: tcoList ? (funcs.sum_dist(tcoFilter("CPI")) * 5) / 11 : 0,
      Tempo: tcoList ? funcs.sum_time(tcoFilter("CPI")) : 0,
    },
  ];

  const comandosTime = tcoList?.map((item) => ({
    date: item.date,
    Gasolina: tcoList ? item.dist / 11 : 0,
    Distância: tcoList ? item.dist : 0,
    Dinheiro: tcoList ? (item.dist * 5) / 11 : 0,
    Tempo: tcoList ? item.duration : 0,
  }));

  const valueFormatter = (number) =>
    `${Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(number)
      .toString()}`;

  return (
    <Stack spacing={5} p={5}>
      <Wrap>
        {cards.map((card, index) => (
          <CardValue
            key={index}
            color={card.color}
            title={card.title}
            value={card.value(tcoList)}
          />
        ))}
      </Wrap>
      <Table
        variant="striped"
        colorScheme="gray"
        loading={loading}
        data={tcoList}
        columns={columns}
        showActions={false}
      />
      <Wrap justify="space-between" w="full" spacing={5}>
        <DonutChart
          loading={loading}
          title="Gasolina (Litros)"
          data={comandos}
          category="Gasolina"
          valueFormatter={valueFormatter}
        />
        <DonutChart
          loading={loading}
          title="Distância (KM)"
          data={comandos}
          category="Distância"
          valueFormatter={valueFormatter}
        />
        <DonutChart
          loading={loading}
          title="Dinheiro (R$)"
          data={comandos}
          category="Dinheiro"
          valueFormatter={valueFormatter}
        />
        <DonutChart
          loading={loading}
          title="Tempo (minutos)"
          data={comandos}
          category="Tempo"
          valueFormatter={valueFormatter}
        />
      </Wrap>
      <BarChart
        loading={loading}
        title="Economia"
        subtitle="Acompanhe no gráfico abaixo a ecomia com a implantação do TCO"
        data={comandos}
        categories={["Dinheiro", "Tempo", "Distância", "Gasolina"]}
        colors={["blue", "green", "yellow", "orange"]}
        dataFormatter={valueFormatter}
      />
      <AreaChart
        loading={loading}
        title="Dashboard"
        data={comandosTime}
        categories={["Distância", "Gasolina", "Tempo", "Dinheiro"]}
        colors={["orange", "blue", "red", "purple"]}
        dataFormatter={valueFormatter}
      />
    </Stack>
  );
};

export default WithAuth(Page);
