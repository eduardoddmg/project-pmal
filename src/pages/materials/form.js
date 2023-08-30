import { Button, HStack, Heading, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { HeadComp, Input, Select } from "@/components";
import { create, update } from "@/firebase";
import { WithAuth } from "@/hooks";
import { useAuth } from "@/context";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { defaultDate, parseDateToBr } from "@/utils";
import { infracoes, opms } from "@/data";
import estados from "@/data/cidades";

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
    data.date_tco = parseDateToBr(data.date_tco);
    data.date_peticionamento = parseDateToBr(data.date_peticionamento);
    data.date_liberacao = parseDateToBr(data.date_liberacao);

    if (router.query.id)
      await update("materials", router.query.id, data).then(() =>
        router.push("/materials")
      );
    else await create("materials", data).then(() => router.push("/materials"));

    setLoading(false);
  };

  useEffect(() => {
    const routerQuery = router.query;

    const routerQueryKeys = Object.keys(routerQuery);

    routerQueryKeys.forEach((key) => {
      setValue(key, routerQuery[key]);
    });
  }, []);

  return (
    <Stack p={[2, 20]} w="95%" mx="auto">
      <HeadComp title="Apreensão de materiais" />
      <Heading as="h2" textAlign="center" mb={6}>
        Registro - Apreensão de Materiais
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Select title="Cidade" {...register("city")} isRequired>
          {estados.cidades.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </Select>
        <Input
          title="Número TCO"
          type="text"
          errors={errors?.n_tco}
          {...register("n_tco")}
        />
        <Input
          title="Data TCO"
          type="date"
          errors={errors?.date_tco}
          {...register("date_tco")}
          defaultValue={defaultDate()}
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
        <Select title="Unidade de origem" {...register("unidade_origem")}>
          {opms
            .find((item) => item.name === auth.opm)
            .sub.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })}
        </Select>
        <Select
          title="Infração Penal"
          {...register("infracao_penal")}
          isRequired
        >
          {infracoes.map((item, index) => (
            <option value={item.name} key={index}>
              {item.name}
            </option>
          ))}
        </Select>
        <Input
          title="Autor"
          type="text"
          errors={errors?.autor}
          {...register("autor")}
        />
        <Input
          title="Juízo de destino"
          type="text"
          errors={errors?.juizo_destino}
          {...register("juizo_destino")}
        />
        <Input
          title="Data Peticionamento"
          type="date"
          errors={errors?.date_peticionamento}
          {...register("date_peticionamento")}
          defaultValue={defaultDate()}
        />
        <Input
          title="Nº processo judicial"
          type="text"
          errors={errors?.n_process}
          {...register("n_process")}
        />
        <Input
          title="Nome do material"
          type="text"
          errors={errors?.name_material}
          {...register("name_material")}
        />
        <Input
          title="Descrição do material"
          type="text"
          errors={errors?.description_material}
          {...register("description_material")}
        />
        <Input
          title="Local"
          type="text"
          errors={errors?.local_material}
          {...register("local_material")}
        />
        <Select title="Decisão" {...register("decisao")}>
          <option value="Liberado">Liberado</option>
          <option value="Custeado">Custeado</option>
        </Select>
        <Input
          title="Data Liberação"
          type="date"
          errors={errors?.date_liberacao}
          {...register("date_liberacao")}
          defaultValue={defaultDate()}
        />
        <Input
          title="Local - Liberacao"
          type="text"
          errors={errors?.local_material_liberacao}
          {...register("local_material_liberacao")}
        />
        <Button
          isLoading={loading}
          colorScheme="blue"
          size="lg"
          width="100%"
          mb={4}
          type="submit"
        >
          Registro
        </Button>
      </form>
    </Stack>
  );
};

export default WithAuth(FormMaterials);
