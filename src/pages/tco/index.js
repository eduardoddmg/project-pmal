import {
  ButtonLink,
  Table,
  SearchBar,
  CardMoney,
  HeadComp,
  Navigation,
  CardValue,
} from "@/components";
import { readAll, remove as removeDoc, update } from "@/firebase";
import { WithAuth } from "@/hooks";
import React, { useEffect, useState } from "react";
import * as Chakra from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiRefreshCcw } from "react-icons/fi";
import { parseDateToEn, sortByDateBr, sortByValue } from "@/utils";
import queryString from "query-string";

const badgeColor = {
  entrada: "green",
  saida: "red",
};

const TcoPage = () => {
  const [tcoList, setTcoList] = useState(null);
  const [tcoListFilter, setTcoListFilter] = useState(null);

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);

    const result = await readAll("tco");

    setTcoList(result);
    setTcoListFilter(result);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const edit = (data) => {

    const parsed = {
      id: data.id,
      date: parseDateToEn(data.date),
      infracao_penal: data.infracao_penal,
      bairro: data.bairro,
      n_tco: data.n_tco,
      n_process: data.n_process,
      obs: data.obs,
      city: data.city,
      lat: data.lat,
      long: data.long,
      delegacia: data.delegacia,
    };

    router.push(`/tco/form?${queryString.stringify(parsed)}`);
  };
  const remove = (id) => {
    removeDoc("tco", id);
    fetchData();
  };

  return (
    <Chakra.Stack p={5}>
      <HeadComp title="TCO" />
      <Chakra.Wrap>

      <CardValue 
        title="Km economizados"
        value={tcoList ? tcoList?.reduce((total, item)=> item.dist+total, 0) : 0}
        />
        <CardValue 
        title="Litros de gasolina"
        value={tcoList ? tcoList?.reduce((total, item)=> item.dist+total, 0)/11 : 0}
        />
        <CardValue 
        title="Dinheiro economizado"
        value={tcoList ? (tcoList?.reduce((total, item)=> item.dist+total, 0)/11)*5 : 0}
        />
        </Chakra.Wrap>
      <Chakra.HStack>
        <ButtonLink
          w="80%"
          colorScheme="green"
          alignSelf={["stretch", "start"]}
          href="/tco/form"
        >
          Criar
        </ButtonLink>
        <Chakra.Button onClick={fetchData}>
          <FiRefreshCcw />
        </Chakra.Button>
      </Chakra.HStack>
      <SearchBar
        data={tcoList}
        collection="tco"
        field="name"
        setData={setTcoListFilter}
      />
      <Table
        variant="striped"
        colorScheme="gray"
        loading={loading}
        data={tcoList}
      >
        <Chakra.Thead>
          <Chakra.Tr>
            <Chakra.Th>QTD</Chakra.Th>
            <Chakra.Th>Data</Chakra.Th>
            <Chakra.Th>Infração Penal</Chakra.Th>
            <Chakra.Th>Distância</Chakra.Th>
            <Chakra.Th>Cidade</Chakra.Th>
            <Chakra.Th>Bairro</Chakra.Th>
            <Chakra.Th>Nº TCO</Chakra.Th>
            <Chakra.Th>Nº Processo</Chakra.Th>
            <Chakra.Th>Responsavel Peticionamento</Chakra.Th>
            <Chakra.Th>Observação</Chakra.Th>
          </Chakra.Tr>
        </Chakra.Thead>
        <Chakra.Tbody>
          {tcoListFilter &&
            sortByDateBr(tcoListFilter, "date", false).map((item, key) => {
              return (
                <Chakra.Tr key={item.id}>
                  <Chakra.Td>{key + 1}</Chakra.Td>
                  <Chakra.Td>{item.date}</Chakra.Td>
                  <Chakra.Td>{item.infracao_penal}</Chakra.Td>
                  <Chakra.Td>{item.dist.toFixed(1)} KM</Chakra.Td>
                  <Chakra.Td>{item.city}</Chakra.Td>
                  <Chakra.Td>{item.bairro}</Chakra.Td>
                  <Chakra.Td>{item.n_tco}</Chakra.Td>
                  <Chakra.Td>{item.n_process}</Chakra.Td>
                  <Chakra.Td>{item.responsavel_peticionamento}</Chakra.Td>
                  <Chakra.Td>{item.obs}</Chakra.Td>
                  <Chakra.Td>
                    <Chakra.Button
                      colorScheme="orange"
                      onClick={() => edit(item)}
                    >
                      Editar
                    </Chakra.Button>
                  </Chakra.Td>
                  <Chakra.Td>
                    <Chakra.Button
                      colorScheme="red"
                      onClick={() => remove(item.id)}
                    >
                      Apagar
                    </Chakra.Button>
                  </Chakra.Td>
                </Chakra.Tr>
              );
            })}
        </Chakra.Tbody>
      </Table>
    </Chakra.Stack>
  );
};

export default WithAuth(TcoPage);
