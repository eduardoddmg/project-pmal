import {
  ButtonLink,
  Table,
  HeadComp,
  CardValue,
  Select,
  ModalFilterTco,
  showModal,
} from "@/components";
import { readAll, remove as removeDoc } from "@/firebase";
import { WithAuth } from "@/hooks";
import React, { useEffect, useState } from "react";
import * as Chakra from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiRefreshCcw } from "react-icons/fi";
import {
  AiFillFileExcel,
  AiFillFilter,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { parseDateToEn, columnsTco, cards } from "@/utils";
import queryString from "query-string";
import { CSVLink } from "react-csv";
import { useForm } from "react-hook-form";
import opm from "@/data/opm";
import { useAuth } from "@/context";
import { IoMdClose } from "react-icons/io";
import { parse } from "dotenv";
import { organograma } from "@/data";

const TcoPage = () => {
  const [tcoList, setTcoList] = useState(null);
  const [tcoListFilter, setTcoListFilter] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showCards, setShowCards] = Chakra.useBoolean();

  const auth = useAuth();

  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    const result = await readAll("tco");
    const subs = auth.comando
      ? organograma.find((item) => item.name === auth.comando).sub
      : [auth.opm];
    console.log(subs);
    setTcoList(
      auth.admin
        ? result
        : result
            .sort((a, b) => a.date - b.date)
            .filter((item) => subs.includes(item.responsavel_peticionamento))
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const view = (id) => router.push(`/tco/${id}`);

  const edit = (data) => {
    data.date = parseDateToEn(data.date);

    router.push(`/tco/form?${queryString.stringify(data)}`);
  };
  const remove = (id) => {
    removeDoc("tco", id);
    fetchData();
  };

  return (
    <Chakra.Stack p={5}>
      <HeadComp title="TCO PMAL" />
      <Chakra.Button
        display={loading && "none"}
        leftIcon={showCards ? <IoMdClose /> : <AiOutlinePlusCircle />}
        colorScheme={showCards ? "red" : "green"}
        alignSelf="start"
        onClick={setShowCards.toggle}
      >
        {showCards ? "Ocultar cartões" : "Ver cartões"}
      </Chakra.Button>
      {showCards && (
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
      )}
      <Chakra.HStack>
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
        columns={columnsTco}
        view={view}
        edit={edit}
        remove={remove}
        showActions
      />
    </Chakra.Stack>
  );
};

export default WithAuth(TcoPage);
