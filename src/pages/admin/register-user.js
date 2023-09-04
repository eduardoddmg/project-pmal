import * as Chakra from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ButtonLink, HeadComp, Input, Select } from "@/components";
import { useAuth } from "@/context";
import { yupResolver } from "@hookform/resolvers/yup";
import * as schema from "@/schema";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import opm from "@/data/opm.json";
import { signUp } from "@/firebase";
import { WithAuth } from "@/hooks";

const Admin = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema.login) });

  const auth = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const toast = Chakra.useToast();

  const onSubmit = async (data) => {
    setLoading(true);

    const result = await signUp(data.email, data.password, data.opm);
    toast({
      title: result.message,
      status: result.success ? "success" : "error",
      duration: 9000,
      isClosable: true,
    });
    console.log(data, result);

    setLoading(false);
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
          Cadastro
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
          <Select title="OPM" {...register("opm")}>
            {opm.map((item) => (
              <option value={item.name}>{item.name}</option>
            ))}
          </Select>
          <Chakra.Button
            colorScheme="blue"
            size="lg"
            width="100%"
            my={4}
            type="submit"
            isLoading={loading}
          >
            Criar
          </Chakra.Button>
        </form>
      </Chakra.Box>
    </Chakra.Flex>
  );
};

export default WithAuth(Admin);
