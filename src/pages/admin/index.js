import React from "react";
import { WithAuth } from "@/hooks";
import { Heading, VStack, Wrap } from "@chakra-ui/react";
import { Card } from "@/components";
import { BsPeople } from "react-icons/bs";
import { AiTwotoneDashboard } from "react-icons/ai";

const Admin = () => {
  return (
    <VStack my={10}>
      <Heading>Administrador</Heading>
      <Wrap p={10} w="full" spacing={5}>
        <Card
          href="/admin/users"
          title="Usuários"
          subtitle="Controle os usuários do sistema"
          bg="green.600"
          icon={<BsPeople fontSize="50px" color="white" />}
        />
        <Card
          href="/admin/dashboard"
          title="Dashboard"
          subtitle="Tenha acesso ao dashboard do sistema"
          bg="orange.600"
          icon={<AiTwotoneDashboard fontSize="50px" color="white" />}
        />
      </Wrap>
    </VStack>
  );
};

export default WithAuth(Admin);
