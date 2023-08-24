import React from "react";
import GoogleMapReact from "google-map-react";
import { WithAuth } from "@/hooks";
import { Stack } from "@chakra-ui/react";
import { Card } from "@/components";
import { BsMap } from "react-icons/bs";

const SimpleMap = () => {
  return (
    <Stack p={10}>
      <Card
        href="/map/map-intensidade"
        title="Implantação TCO"
        subtitle="Veja o mapa de intensidade da implantação do TCO"
        bg="green.600"
        icon={<BsMap fontSize="50px" color="white" />}
      />
    </Stack>
  );
};

export default WithAuth(SimpleMap);
