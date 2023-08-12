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
import queryString from "query-string";

const MaterialsPage = () => {
  const [materialList, setMaterialList] = useState(null);
  const [materialListFilter, setMaterialListFilter] = useState(null);

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);

    const result = await readAll("materials");

    setMaterialList(result);
    setMaterialListFilter(result);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const edit = (data) => {
    const parsed = {
      id: data.id,
      date_apreensao: parseDateToEn(data.date_apreensao),
      city: data.city,
      cop: data.cop,
      autor: data.autor,
      marca_tipo: data.marca_tipo,
      modelo: data.modelo,
      deposito: data.deposito,
      n_process: data.n_process,
      pm_name: data.pm_name,
      pm_mat: data.pm_mat,
      status: data.status,
      data_freedom: data.date_freedom,
    };

    router.push(`/materials/form?${queryString.stringify(parsed)}`);
  };

  const remove = (id) => {
    removeDoc("materials", id);
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
          href="/materials/form"
        >
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
        data={materialList}
      >
        <Chakra.Thead>
          <Chakra.Tr>
            <Chakra.Th>Data Apreensão</Chakra.Th>
            <Chakra.Th>Cidade</Chakra.Th>
            <Chakra.Th>COP</Chakra.Th>
            <Chakra.Th>Autor</Chakra.Th>
            <Chakra.Th>Marca / Tipo</Chakra.Th>
            <Chakra.Th>Modelo / SN</Chakra.Th>
            <Chakra.Th>Depósito</Chakra.Th>
            <Chakra.Th>Nº Processo Judicial</Chakra.Th>
            <Chakra.Th>Nº PM Responsável</Chakra.Th>
            <Chakra.Th>Status</Chakra.Th>
            <Chakra.Th>Data Liberação</Chakra.Th>
          </Chakra.Tr>
        </Chakra.Thead>
        <Chakra.Tbody>
          {materialListFilter &&
            sortByDateBr(materialListFilter, "date_apreensao", false).map(
              (item, key) => {
                return (
                  <Chakra.Tr key={item.id}>
                    <Chakra.Td>{item.date_apreensao}</Chakra.Td>
                    <Chakra.Td>{item.city}</Chakra.Td>
                    <Chakra.Td>{item.cop}</Chakra.Td>
                    <Chakra.Td>{item.autor}</Chakra.Td>
                    <Chakra.Td>{item.marca_tipo}</Chakra.Td>
                    <Chakra.Td>{item.modelo}</Chakra.Td>
                    <Chakra.Td>{item.deposito}</Chakra.Td>
                    <Chakra.Td>{item.n_process}</Chakra.Td>
                    <Chakra.Td>
                      {item.pm_name} - {item.pm_mat}
                    </Chakra.Td>
                    <Chakra.Td>{item.status}</Chakra.Td>
                    <Chakra.Td>{item.date_freedom}</Chakra.Td>
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
              }
            )}
        </Chakra.Tbody>
      </Table>
    </Chakra.Stack>
  );
};

export default WithAuth(MaterialsPage);
