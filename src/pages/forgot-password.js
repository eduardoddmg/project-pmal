import * as Chakra from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ButtonLink, HeadComp, Input } from "@/components";
import { forgotPassword, login } from "@/firebase";
import { useAuth } from "@/context";
import { WithoutAuth } from "@/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as schema from "@/schema";

const ForgotPassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema.forgot) });

  const auth = useAuth();
  const toast = Chakra.useToast();

  const onSubmit = async (data) => {
    const result = await forgotPassword(data.email);
    toast({
        title: result.message,
        status: result.status,
        duration: 2000,
      });
  };

  return (
    <Chakra.Flex py={20} align="center" justify="center">
      <HeadComp title="Redefinir senha" />
      <Chakra.Box
        bg="white"
        p={8}
        rounded="md"
        shadow="md"
        maxWidth="400px"
        width="100%"
      >
        <Chakra.Heading as="h2" textAlign="center" mb={6}>
          Recuperar senha
        </Chakra.Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            title="Email"
            type="email"
            errors={errors?.email}
            {...register("email")}
          />
          <Chakra.Button
            colorScheme="blue"
            size="lg"
            width="100%"
            mb={4}
            type="submit"
          >
            Enviar
          </Chakra.Button>
        </form>
      </Chakra.Box>
    </Chakra.Flex>
  );
};

export default WithoutAuth(ForgotPassword);
