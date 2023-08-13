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

  const [loading, setLoading] = useState(false);

  const showInput = watch("status", "cust");

  const onSubmit = async (data) => {
    setLoading(true);
    
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
      await update("materials", router.query.id, data).then(() =>
        router.push("/materials")
      );
    else await create("materials", data).then(() => router.push("/materials"));
    
    setLoading(false);
  };

  useEffect(() => {
    console.log(defaultDate());
    if (Object.keys(router.query).length !== 0) {
      setValue("id", router.query.id);
      setValue("date_apreensao", router.query.date_apreensao);
      setValue("city", router.query.city);
      setValue("cop", router.query.cop);
      setValue("autor", router.query.autor);
      setValue("marca_tipo", router.query.marca_tipo);
      setValue("modelo", router.query.modelo);
      setValue("deposito", router.query.deposito);
      setValue("n_process", router.query.n_process);
      setValue("pm_name", router.query.pm_name);
      setValue("pm_mat", router.query.pm_mat);
      setValue("status", router.query.status);
      setValue("date_freedom", router.query.date_freedom);
    }
  }, []);

  return (
    <Stack p={[2, 20]} w="95%" mx="auto">
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
        <Select title="City" {...register("city")}>
          <option value="maceio">Maceió</option>
          <option value="penedo">Penedo</option>
        </Select>
        <Input
          title="COP"
          type="text"
          errors={errors?.cop}
          {...register("cop")}
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
        <Button isLoading={loading} colorScheme="blue" size="lg" width="100%" mb={4} type="submit">
          Registro
        </Button>
      </form>
    </Stack>
  );
};

export default WithAuth(FormMaterials);
