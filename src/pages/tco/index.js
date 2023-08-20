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
import {
  AiFillInfoCircle,
  AiFillEdit,
  AiFillCloseCircle,
  AiFillFileExcel,
} from "react-icons/ai";
import { parseDateToEn, sortByDateBr, sortByValue } from "@/utils";
import queryString from "query-string";
import { CSVLink } from "react-csv";

const TcoPage = () => {
  const [tcoList, setTcoList] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);

    const result = await readAll("tco");
    setTcoList(result);

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
          color="green"
          title="Km economizados"
          value={
            tcoList ? tcoList?.reduce((total, item) => item.dist + total, 0) : 0
          }
          />
        <CardValue
          color="yellow"
          title="Litros de gasolina"
          value={
            tcoList
              ? tcoList?.reduce((total, item) => item.dist + total, 0) / 11
              : 0
          }
        />
        <CardValue
          color="blue"
          title="Dinheiro economizado"
          value={
            tcoList
              ? (tcoList?.reduce((total, item) => item.dist + total, 0) / 11) *
                5
              : 0
          }
        />
        <CardValue
            color="purple"
          title="Minutos economizado"
          value={
            tcoList
              ? tcoList?.reduce((total, item) => item.duration + total, 0)
              : 0
          }
        />
      </Chakra.Wrap>
      <Chakra.HStack>
        <CSVLink data={tcoList || []} filename="tco">
          <Chakra.Button
            leftIcon={<AiFillFileExcel />}
            colorScheme="green"
            alignSelf="start"
          >
            Baixar
          </Chakra.Button>
        </CSVLink>
        <ButtonLink colorScheme="green" alignSelf="start" href="/tco/form">
          Criar
        </ButtonLink>
        <Chakra.Button onClick={fetchData}>
          <FiRefreshCcw />
        </Chakra.Button>
      </Chakra.HStack>
      <Table
        variant="striped"
        colorScheme="gray"
        loading={loading}
        data={tcoList}
      >
        <Chakra.Thead>
          <Chakra.Tr>
            <Chakra.Th>Data</Chakra.Th>
            <Chakra.Th>Infração Penal</Chakra.Th>
            <Chakra.Th>Cidade</Chakra.Th>
            <Chakra.Th>Nº TCO</Chakra.Th>
          </Chakra.Tr>
        </Chakra.Thead>
        <Chakra.Tbody>
          {tcoList &&
            tcoList.map((item, key) => {
              return (
                <Chakra.Tr key={item.id}>
                  <Chakra.Td>{item.date}</Chakra.Td>
                  <Chakra.Td>{item.infracao_penal}</Chakra.Td>
                  <Chakra.Td>{item.city}</Chakra.Td>
                  <Chakra.Td>{item.n_tco}</Chakra.Td>
                  <Chakra.Td>
                    <Chakra.Button
                      colorScheme="blue"
                      variant="ghost"
                      fontSize="30px"
                      onClick={() => router.push(`/tco/${item.id}`)}
                    >
                      <AiFillInfoCircle />
                    </Chakra.Button>
                  </Chakra.Td>
                  <Chakra.Td>
                    <Chakra.Button
                      colorScheme="orange"
                      variant="ghost"
                      fontSize="30px"
                      onClick={() => edit(item)}
                    >
                      <AiFillEdit />
                    </Chakra.Button>
                  </Chakra.Td>
                  <Chakra.Td>
                    <Chakra.Button
                      colorScheme="red"
                      variant="ghost"
                      fontSize="30px"
                      onClick={() => remove(item.id)}
                    >
                      <AiFillCloseCircle />
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
