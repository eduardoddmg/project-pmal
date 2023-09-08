import {
    ButtonLink,
    Table,
    HeadComp,
  } from "@/components";
  import { readAll, remove as removeDoc, removeUserByEmail } from "@/firebase";
  import React, { useEffect, useState } from "react";
  import * as Chakra from "@chakra-ui/react";
  import { useRouter } from "next/router";
  import { FiRefreshCcw } from "react-icons/fi";
  import { parseDateToEn, columnsTco, cards, columnsUsers } from "@/utils";
  import queryString from "query-string";
  import { useAuth } from "@/context";
  
  const Page = () => {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const auth = useAuth();
  
    const router = useRouter();
  
    const fetchData = async () => {
      setLoading(true);
      const result = await readAll("users");
      setUsers(result);
      setLoading(false);
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const view = (id) => router.push(`/admin/users/${id}`);
  
    const remove = (id) => {
      removeDoc("users", id);
      fetchData();
    };
  
    return (
      <Chakra.Stack p={5}>
        <HeadComp title="TCO" />
        <Chakra.HStack>
          <ButtonLink colorScheme="green" alignSelf="start" href="/admin/users/form">
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
          data={users}
          columns={columnsUsers}
          view={view}
          remove={remove}
          showActions
          hiddenEdit
        />
      </Chakra.Stack>
    );
  };
  
  export default Page;
  