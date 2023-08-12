import { Button, HStack, Heading, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { HeadComp, Input, Select } from "@/components";
import { create, update } from "@/firebase";
import { WithAuth } from "@/hooks";
import { useAuth } from "@/context";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { defaultDate, parseDateToBr } from "@/utils";

const FormMaterials = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const auth = useAuth();
  const router = useRouter();

  const showInput = watch("status", "cust");

  const onSubmit = (data) => {
    console.log(data);
    data.userId = auth.token;
    data.date_apreensao = parseDateToBr(data.date_apreensao);

    if (data.status === "cust") {
      data.date_freedom = "-";
    } else {
      data.date_freedom = parseDateToBr(data.date_freedom);
    }

    console.log(data);

    if (router.query.id)
      update("tco", router.query.id, data).then(() =>
        router.push("/materials")
      );
    else create("materials", data).then(() => router.push("/materials"));
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
    <Stack p={[2, 20]} w="90%" mx="auto">
      <HeadComp title="Apreensão de materiais" />
      <Heading as="h2" textAlign="center" mb={6}>
        Registro - Apreensão de Materiais
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          title="Data apreensão"
          type="date"
          errors={errors?.date_apreensao}
          {...register("date_apreensao")}
          defaultValue={defaultDate()}
        />
        <Input
          title="Infração Penal"
          type="text"
          errors={errors?.infracao_penal}
          {...register("infracao_penal")}
        />
        <Select title="City" {...register("city")}>
          <option value="maceio">Maceió</option>
          <option value="penedo">Penedo</option>
        </Select>
        <Input
          title="COP"
          type="text"
          errors={errors?.COP}
          {...register("COP")}
        />
        <Input
          title="Autor"
          type="text"
          errors={errors?.autor}
          {...register("autor")}
        />
        <Input
          title="Marca / tipo"
          type="text"
          errors={errors?.marca_tipo}
          {...register("marca_tipo")}
        />
        <Input
          title="Modelo/SN"
          type="text"
          errors={errors?.modelo}
          {...register("modelo")}
        />
        <Select title="Depósito" {...register("deposito")}>
          <option value="interno">Interno</option>
          <option value="externo">externo</option>
        </Select>
        <Input
          title="Nº processo judicial"
          type="text"
          errors={errors?.n_process}
          {...register("n_process")}
        />
        <Input
          title="PM Responsável - Nome "
          type="text"
          errors={errors?.pm_name}
          {...register("pm_name")}
        />
        <Input
          title="PM Responsável - Matricula "
          type="text"
          errors={errors?.pm_mat}
          {...register("pm_mat")}
        />
        <Select title="Status" {...register("status")}>
          <option value="cust">Cust</option>
          <option value="lib">Lib</option>
        </Select>
        {showInput === "lib" && (
          <Input
            title="Data liberação"
            type="date"
            errors={errors?.date_freedom}
            {...register("date_freedom")}
            defaultValue={defaultDate()}
          />
        )}
        <Button colorScheme="blue" size="lg" width="100%" mb={4} type="submit">
          Registro
        </Button>
      </form>
    </Stack>
  );
};

export default WithAuth(FormMaterials);
