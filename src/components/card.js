import * as Chakra from "@chakra-ui/react";
import { useRouter } from "next/router";
import { animated, useSpring, config } from "react-spring";

export const Card = ({ href, title, subtitle, icon, bg, ...rest }) => {
  const router = useRouter();
  return (
    <Chakra.VStack
      w={["100%", "80%", "30%"]}
      cursor="pointer"
      onClick={() => router.push(href)}
      borderRadius={5}
      px={7}
      py={7}
      textAlign="center"
      bg={bg}
      {...rest}
    >
      {icon}
      <Chakra.Heading color="white">{title}</Chakra.Heading>
      <Chakra.Text color="white">{subtitle}</Chakra.Text>
    </Chakra.VStack>
  );
};

export const CardMoney = ({ title, value, color }) => {
  const springProps = useSpring({
    number: value,
    from: { number: 0 },
    config: config.slow,
  });

  return (
    <Chakra.Card p={6} w={["100%", "100%", "30%"]} textAlign="center">
      <Chakra.Stat>
        <Chakra.StatLabel>
          <Chakra.Badge colorScheme={color || "white"}>{title}</Chakra.Badge>
        </Chakra.StatLabel>
        <Chakra.StatNumber>
          R${" "}
          <animated.span>
            {springProps.number.to((x) => x.toFixed(2))}
          </animated.span>
        </Chakra.StatNumber>
      </Chakra.Stat>
    </Chakra.Card>
  );
};

export const CardValue = ({ title, value, color }) => {
  const springProps = useSpring({
    number: value,
    from: { number: 0 },
    config: config.slow,
  });

  return (
    <Chakra.Card p={6} w={["100%", "100%", "30%"]} textAlign="center">
      <Chakra.Stat>
        <Chakra.StatLabel>
          <Chakra.Badge colorScheme={color || "white"}>{title}</Chakra.Badge>
        </Chakra.StatLabel>
        <Chakra.StatNumber>
          <animated.span>
            {springProps.number.to((x) => x.toFixed(0))}
          </animated.span>
        </Chakra.StatNumber>
      </Chakra.Stat>
    </Chakra.Card>
  );
};
