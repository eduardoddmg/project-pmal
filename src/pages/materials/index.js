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
import { columnsMaterials } from "@/utils/materials";

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
      date_tco: parseDateToEn(data.date_tco),
      date_peticionamento: parseDateToEn(data.date_peticionamento),
      date_liberacao: parseDateToEn(data.date_liberacao),
      city: data.city,
      n_tco: data.n_tco,
      pm_name: data.pm_name,
      pm_mat: data.pm_mat,
      unidade_origem: data.unidade_origem,
      infracao_penal: data.infracao_penal,
      autor: data.autor,
      n_process: data.n_process,
      name_material: data.n_process,
      description_material: data.description_material,
      local_material: data.local_material,
      decisao: data.decisao,
      local_material_liberacao: data.local_material_liberacao,
    };

    router.push(`/materials/form?${queryString.stringify(parsed)}`);
  };

  const remove = (id) => {
    removeDoc("materials", id);
    fetchData();
  };

  const view = (id) => router.push(`/materials/${id}`);


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
        columns={columnsMaterials}
        view={view}
        edit={edit}
        remove={remove}
        showActions
      />
    </Chakra.Stack>
  );
};

export default WithAuth(MaterialsPage);
