import { AreaChart, BarChart, CardValue, DonutChart, Table } from "@/components";
import { opms } from "@/data";
import { readAll } from "@/firebase";
import { WithAuth } from "@/hooks";
import { cards, columns, formatDateToMonthYear, funcs, removeDuplicatesByField } from "@/utils";
import { Stack, Wrap } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Page = () => {
  const [tcoList, setTcoList] = useState(null);
  const [loading, setLoading] = useState(true);

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
    removeDuplicatesByField(tcoFilter("CPC").map((item) => ({
      name: item.responsavel_peticionamento,
      date: item.date,
      "Gasolina": tcoList
        ? funcs.sum_dist(tcoFilter(item.responsavel_peticionamento)) / 11
        : 0,
      "Distância": tcoList
        ? funcs.sum_dist(tcoFilter(item.responsavel_peticionamento))
        : 0,
      "Dinheiro": tcoList
        ? (funcs.sum_dist(tcoFilter(item.responsavel_peticionamento)) * 5) / 11
        : 0,
      "Tempo": tcoList
        ? funcs.sum_time(tcoFilter(item.responsavel_peticionamento))
        : 0,
    })), "name");

  console.log(batalhoes);

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
      {batalhoes && (
        <Wrap justify="space-between" w="full" spacing={5}>
          <DonutChart
            title="Gasolina (Litros)"
            data={batalhoes}
            category="Gasolina"
            valueFormatter={valueFormatter}
          />
          <DonutChart
            title="Distância (KM)"
            data={batalhoes}
            category="Distância"
            valueFormatter={valueFormatter}
          />
          <DonutChart
            title="Dinheiro (R$)"
            data={batalhoes}
            category="Dinheiro"
            valueFormatter={valueFormatter}
          />
          <DonutChart
            title="Tempo (minutos)"
            data={batalhoes}
            category="Tempo"
            valueFormatter={valueFormatter}
          />
        </Wrap>
      )}
      <BarChart
        title="Economia"
        subtitle="Acompanhe no gráfico abaixo a ecomia com a implantação do TCO"
        data={batalhoes}
        categories={["Dinheiro", "Tempo", "Distância", "Gasolina"]}
        colors={["blue", "green", "yellow", "orange"]}
        dataFormatter={valueFormatter}
      />
      <AreaChart
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
