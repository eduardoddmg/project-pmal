import {
  ButtonLink,
  Table,
  SearchBar,
  CardMoney,
  HeadComp,
  Navigation,
} from "@/components";
import { readAll, remove as removeDoc, update } from "@/firebase";
import { WithAuth } from "@/hooks";
import React, { useEffect, useState } from "react";
import * as Chakra from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiRefreshCcw } from "react-icons/fi";
import { parseDateToEn, sortByDateBr, sortByValue } from "@/utils";

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
    router.push(
      `/tco/form?id=${data.id}&title=${data.title}&value=${data.value}&type=${
        data.type
      }&date=${parseDateToEn(data.date)}`
    );
  };

  const remove = (id) => {
    removeDoc("tco", id);
    fetchData();
  };

  return (
    <Chakra.Stack p={5}>
      <HeadComp title="TCO" />
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
            <Chakra.Th>Cidade</Chakra.Th>
            <Chakra.Th>Bairro</Chakra.Th>
            <Chakra.Th>Nº TCO</Chakra.Th>
            <Chakra.Th>Nº Processo</Chakra.Th>
            <Chakra.Th>responsavel_peticionamento</Chakra.Th>
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
