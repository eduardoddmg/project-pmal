import React from "react";
import GoogleMapReact from "google-map-react";
import { WithAuth } from "@/hooks";
import { Flex, Heading, Stack, VStack, Wrap } from "@chakra-ui/react";
import { Card } from "@/components";
import { BsMap, BsPeople } from "react-icons/bs";
import { AiFillDashboard } from "react-icons/ai";

const Admin = () => {
  return (
    <VStack my={10}>
      <Heading>Administrador</Heading>
      <Wrap p={10} w="full" spacing={5}>
        <Card
          href="/admin/register-user"
          title="Cadastrar usuários"
          subtitle="Cadastre usuários de comando ou OPM"
          bg="green.600"
          icon={<BsPeople fontSize="50px" color="white" />}
        />
        <Card
          href="/admin/cpc"
          title="CPC"
          subtitle="Confira o relatório de implantação do TCO"
          bg="red.600"
          icon={<AiFillDashboard fontSize="50px" color="white" />}
        />
        <Card
          href="/admin/cpi"
          title="CPI"
          subtitle="Confira o relatório de implantação do TCO"
          bg="orange.600"
          icon={<AiFillDashboard fontSize="50px" color="white" />}
        />
        <Card
          href="/admin/cpai1"
          title="CPAI-1"
          subtitle="Confira o relatório de implantação do TCO"
          bg="yellow.600"
          icon={<AiFillDashboard fontSize="50px" color="white" />}
        />
        <Card
          href="/admin/cpai2"
          title="CPAI-2"
          subtitle="Confira o relatório de implantação do TCO"
          bg="green.600"
          icon={<AiFillDashboard fontSize="50px" color="white" />}
        />
        <Card
          href="/admin/cpai3"
          title="CPAI-3"
          subtitle="Confira o relatório de implantação do TCO"
          bg="gray.600"
          icon={<AiFillDashboard fontSize="50px" color="white" />}
        />
      </Wrap>
    </VStack>
  );
};

export default WithAuth(Admin);
