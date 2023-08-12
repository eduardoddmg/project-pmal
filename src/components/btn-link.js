import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";

export const ButtonLink = ({ href, children, ...rest }) => {
  const router = useRouter();

  const handleClick = (event) => {
    event.preventDefault();
    router.push(href);
  };

  return (
    <Button onClick={handleClick} {...rest} fontWeight="normal">
      {children}
    </Button>
  );
};

export const ButtonLinkBack = ({ children, ...rest }) => {
  const router = useRouter();

  const handleClick = (event) => {
    event.preventDefault();
    router.back();
  };

  return (
    <Button onClick={handleClick} {...rest} fontWeight="normal">
      {children}
    </Button>
  );
};