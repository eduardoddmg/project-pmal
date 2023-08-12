import { Box, Button, Flex, Heading, Link, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  HeadComp,
  Input,
  InputNumber,
  InputNumberMoney,
  Navigation,
  Select,
} from "@/components";
import { create, signUp, update } from "@/firebase";
import { WithAuth } from "@/hooks";
import { useAuth } from "@/context";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { defaultDate, parseDateToBr, parseSecondsToDate } from "@/utils";
import * as schema from "@/schema";
import { yupResolver } from "@hookform/resolvers/yup";

const FormExpenses = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const auth = useAuth();
  const router = useRouter();

  const onSubmit = (data) => {
    data.userId = auth.token;
    data.date = parseDateToBr(data.date);
    
    console.log(data);

    if (router.query.id)
      update("tco", router.query.id, data).then(() =>
        router.push("/tco")
      );
    else create("tco", data).then(() => router.push("/tco"));
  };

  useEffect(() => {
    console.log(defaultDate());
    if (Object.keys(router.query).length !== 0) {
      console.log("estou chegando aqui");
      setValue("title", router.query.title);
      setValue("value", router.query.value);
      setValue("type", router.query.type);
      setValue("date", router.query.date);
    }
  }, []);

  return (
    <Stack p={[2, 20]} w="50%" mx="auto">
      <HeadComp title="TCO" />
      <Heading as="h2" textAlign="center" mb={6}>
        Registro - TCO
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          title="Data"
          type="date"
          errors={errors?.date}
          {...register("date")}
          defaultValue={defaultDate()}
        />
        <Input
          title="Infração Penal"
          type="text"
          errors={errors?.infracao_penal}
          {...register("infracao_penal")}
        />
        <Input
          title="Bairro"
          type="text"
          errors={errors?.bairro}
          {...register("bairro")}
        />
        <Input
          title="Nº TCO"
          type="text"
          errors={errors?.n_tco}
          {...register("n_tco")}
        />
        <Input
          title="Nº processo"
          type="text"
          errors={errors?.n_process}
          {...register("n_process")}
        />
        <Input
          title="Observação"
          type="text"
          errors={errors?.obs}
          {...register("obs")}
        />
        <Select title="City" {...register("city")}>
          <option value="maceio">Maceió</option>
          <option value="penedo">Penedo</option>
        </Select>
        <Select title="Responsável peticionamento" {...register("responsavel_peticionamento")}>
          <option value="corregedoria">Corregedoria</option>
          <option value="1-bpm">1 BPM</option>
        </Select>
        <Button colorScheme="blue" size="lg" width="100%" mb={4} type="submit">
          Registro
        </Button>
      </form>
    </Stack>
  );
};

export default WithAuth(FormExpenses);
