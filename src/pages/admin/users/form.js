import * as Chakra from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  ButtonLink,
  HeadComp,
  Input,
  InputPassword,
  Select,
} from "@/components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as schema from "@/schema";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signUp } from "@/firebase";
import organograma from "@/data/organograma";
import sortArray from "sort-array";

const Admin = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm({ resolver: yupResolver(schema.login) });

  const showRole = watch("role", "OPM");

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const toast = Chakra.useToast();

  const onSubmit = async (data) => {
    setLoading(true);

    console.log(data);

    const result = await signUp(data);

    console.log(result);

    toast({
      title: result.message,
      status: result.success ? "success" : "error",
      duration: 9000,
      isClosable: true,
    });

    setLoading(false);
  };

  useEffect(() => {
    const routerQuery = router.query;

    const routerQueryKeys = Object.keys(routerQuery);

    routerQueryKeys.forEach((key) => {
      setValue(key, routerQuery[key]);
    });
  }, []);

  const comandos = organograma.map((item) => item.name);
  const unidades = sortArray([].concat(...organograma.map((item) => item.sub)));

  return (
    <Chakra.Flex py={20} align="center" justify="center">
      <HeadComp title="TCO PMAL" description="Adicione usuários no sistema" />
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
          <InputPassword
            title="Senha"
            errors={errors?.password}
            {...register("password")}
          />
          <Select title="Tipo de usuário" {...register("role")}>
            <option value="OPM">OPM</option>
            <option value="Comando">Comando</option>
          </Select>
          {showRole === "OPM" ? (
            <Select title="OPM" {...register("opm")}>
              {unidades.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </Select>
          ) : (
            <Select title="Comandos" {...register("comandos")}>
              {comandos.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </Select>
          )}
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

export default Admin;
