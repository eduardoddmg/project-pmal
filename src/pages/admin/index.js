import * as Chakra from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ButtonLink, HeadComp, Input, Select } from "@/components";
import { login } from "@/firebase";
import { useAuth } from "@/context";
import { WithoutAuth } from "@/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as schema from "@/schema";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dotenv from "dotenv";

dotenv.config();

const opm = [
  {
    value: "1bpm",
    name: "1º Batalhão",
  },
  {
    value: "2bpm",
    name: "2º Batalhão",
  },
  {
    value: "3bpm",
    name: "3º Batalhão",
  },
  {
    value: "4bpm",
    name: "4º Batalhão",
  },
  {
    value: "5bpm",
    name: "5º Batalhão",
  },
  {
    value: "5bpm",
    name: "5º Batalhão",
  },
  {
    value: "6bpm",
    name: "6º Batalhão",
  },
  {
    value: "7bpm",
    name: "7º Batalhão",
  },
  {
    value: "8bpm",
    name: "8º Batalhão",
  },
  {
    value: "9bpm",
    name: "9º Batalhão",
  },
  {
    value: "10bpm",
    name: "10º Batalhão",
  },
  {
    value: "11bpm",
    name: "11º Batalhão",
  },
  {
    value: "1cia",
    name: "1º CIA",
  },
  {
    value: "2cia",
    name: "2º CIA",
  },
  {
    value: "3cia",
    name: "3º CIA",
  },
  {
    value: "3cia",
    name: "3º CIA",
  },
  {
    value: "4cia",
    name: "4º CIA",
  },
  {
    value: "5cia",
    name: "5º CIA",
  },
  {
    value: "bope",
    name: "BOPE",
  },
  {
    value: "rotam",
    name: "ROTAM",
  },
  {
    value: "bpa",
    name: "BPA",
  },
  {
    value: "bprv",
    name: "BPRV",
  },
  {
    value: "bptran",
    name: "BPTRAN",
  },
  {
    value: "rpmon",
    name: "RPMON",
  },
  {
    value: "cpc",
    name: "CPC",
  },
  {
    value: "cpa1",
    name: "CPA-1",
  },
  {
    value: "cpa2",
    name: "CPA-2",
  },
  {
    value: "cpa3",
    name: "CPA-3",
  },
  {
    value: "cpi",
    name: "CPI",
  },
];

const Admin = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema.login) });

  const auth = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    console.log(data);

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
              <option value={item.value}>{item.name}</option>
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

export default Admin;
