import { Center, Spinner, Stack, Image } from '@chakra-ui/react'
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

// export const Loading = () => {
//   return (
//     <Center py={20}>
//         <Spinner size="xl"/>
//     </Center>
//   )
// }

export function Loading() {
  const [pulsate, setPulsate] = useState(true);

  const pulseAnimation = useSpring({
    to: async (next) => {
      while (pulsate) {
        await next({ opacity: 0.5});
        await next({ opacity: 0 });
      }
    },
    from: { opacity: 1 },
  });

  return (
    <Center py={10} w="full">
      <animated.div
        style={{
          ...pulseAnimation,
          width: "40%", // Ajuste o tamanho da imagem conforme necessário
          height: "auto",
          textAlign: "center",
        }}
      >
        <Image src="/logo.png" align="center" w="full" />
      </animated.div>
    </Center>
  );
}
