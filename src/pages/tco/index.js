import {
  ButtonLink,
  Table,
  HeadComp,
  CardValue,
  Select,
  ModalFilterTco,
} from "@/components";
import { readAll, remove as removeDoc } from "@/firebase";
import { WithAuth } from "@/hooks";
import React, { useEffect, useState } from "react";
import * as Chakra from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiRefreshCcw } from "react-icons/fi";
import { AiFillFileExcel, AiFillFilter } from "react-icons/ai";
import { parseDateToEn, columns, cards } from "@/utils";
import queryString from "query-string";
import { CSVLink } from "react-csv";
import { useForm } from "react-hook-form";
import opm from "@/data/opm";
import { useAuth } from "@/context";

const TcoPage = () => {
  const [tcoList, setTcoList] = useState(null);
  const [tcoListFilter, setTcoListFilter] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = useAuth();

  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    const result = await readAll("tco");
    const subs = opm.find(item => item.name === auth.opm).sub;
    console.log(subs);
    setTcoList(result.filter(item => subs.includes(item.responsavel_peticionamento)));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { isOpen, onOpen, onClose } = Chakra.useDisclosure();

  const view = (id) => router.push(`/tco/${id}`);

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
        {cards.map((card, index) => (
          <CardValue
            key={index}
            color={card.color}
            title={card.title}
            value={card.value(tcoList)}
          />
        ))}
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
        <Chakra.Button
          leftIcon={<AiFillFilter />}
          colorScheme="blue"
          alignSelf="start"
          onClick={onOpen}
        >
          Filtros
        </Chakra.Button>
      </Chakra.HStack>
      <Table
        variant="striped"
        colorScheme="gray"
        loading={loading}
        data={tcoList}
        columns={columns}
        view={view}
        edit={edit}
        remove={remove}
        showActions
      />
      <ModalFilterTco
        opms={opm.find((item) => auth.opm === item.name).sub}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        tcoList={tcoList}
        setTcoList={setTcoList}
      />
    </Chakra.Stack>
  );
};

export default WithAuth(TcoPage);
