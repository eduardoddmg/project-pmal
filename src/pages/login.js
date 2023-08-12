import * as Chakra from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ButtonLink, HeadComp, Input } from "@/components";
import { login } from "@/firebase";
import { useAuth } from "@/context";
import { WithoutAuth } from "@/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as schema from "@/schema";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dotenv from "dotenv";

dotenv.config();

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema.login)});

  const auth = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    
    console.log(data);
    auth.login(data.email, data.password);
  };

  return (
    <Chakra.Flex py={20} align="center" justify="center">
    <HeadComp title="Login" description="Faça login no nosso sistema" />

      <Chakra.Box
        bg="white"
        p={8}
        rounded="md"
        shadow="md"
        w={["100%", "80%", "50%"]}
        width="100%"
      >
        <Chakra.Heading as="h2" textAlign="center" mb={6}>
          Login
        </Chakra.Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            title="Email"
            type="email"
            errors={errors?.email}
            {...register("email")}
          />
          <Input
            title="Senha"
            type="password"
            errors={errors?.password}
            {...register("password")}
          />
          <Chakra.Button
            colorScheme="blue"
            size="lg"
            width="100%"
            mb={4}
            type="submit"
            isLoading={loading}
          >
            Login
          </Chakra.Button>
        </form>
        <Chakra.Text textAlign="center" pt={3}>
          Esqueceu a sua senha?{" "}
          <ButtonLink variant="link" href="/forgot-password" color="blue.500"> Clique aqui </ButtonLink>
        </Chakra.Text>
      </Chakra.Box>
    </Chakra.Flex>
  );
};

export default WithoutAuth(Login);
