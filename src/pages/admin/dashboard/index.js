import React from "react";
import { WithAuth } from "@/hooks";
import { Heading, VStack, Wrap } from "@chakra-ui/react";
import { Card, HeadComp } from "@/components";
import { BsPeople } from "react-icons/bs";
import { AiTwotoneDashboard } from "react-icons/ai";

const Admin = () => {
  return (
    <VStack my={10}>
      <HeadComp title="TCO PMAL" />
      <Heading>Dashboard</Heading>
      <Wrap p={[2, 10]} w="full" spacing={5}>
        <Card
          href="/admin/dashboard/comando"
          title="Dashboard por Comando"
          subtitle="Tenha acesso ao dashboard do sistema por OPM"
          bg="green.600"
          icon={<BsPeople fontSize="50px" color="white" />}
        />
        <Card
          href="/admin/dashboard/opm"
          title="Dashboard por OPM"
          subtitle="Tenha acesso ao dashboard do sistema por OPM"
          bg="orange.600"
          icon={<AiTwotoneDashboard fontSize="50px" color="white" />}
        />
      </Wrap>
    </VStack>
  );
};

export default WithAuth(Admin);
