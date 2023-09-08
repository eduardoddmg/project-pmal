import React from "react";
import GoogleMapReact from "google-map-react";
import { WithAuth } from "@/hooks";
import { Flex, Heading, Stack, VStack, Wrap } from "@chakra-ui/react";
import { Card } from "@/components";
import { BsMap, BsPeople } from "react-icons/bs";
import { AiFillDashboard, AiTwotoneDashboard } from "react-icons/ai";

const Admin = () => {
  return (
    <VStack my={10}>
      <Heading>Dashboard</Heading>
      <Wrap p={10} w="full" spacing={5}>
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
