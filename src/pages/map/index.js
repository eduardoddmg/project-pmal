import React from "react";
import GoogleMapReact from "google-map-react";
import { WithAuth } from "@/hooks";
import { Stack, Wrap } from "@chakra-ui/react";
import { Card } from "@/components";
import { BsMap } from "react-icons/bs";

const SimpleMap = () => {
  return (
      <Wrap w="full" spacing={5} my={10} mx={5} justify={["center", "center", "start"]}>

      <Card
        href="/map/map-intensidade"
        title="Implantação TCO"
        subtitle="Veja o mapa de intensidade da implantação do TCO"
        bg="green.600"
        icon={<BsMap fontSize="50px" color="white" />}
      />
      <Card
        href="/map/delegacias"
        title="Delegacias"
        subtitle="Veja onde fica cada delegacia do estado"
        bg="red.600"
        icon={<BsMap fontSize="50px" color="white" />}
        />
        </Wrap>
  );
};

export default WithAuth(SimpleMap);
