import { Box, Button, Flex, Heading, Link, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { HeadComp, Input, Select, SignaturePad } from "@/components";
import { create, signUp, update } from "@/firebase";
import { WithAuth } from "@/hooks";
import { useAuth } from "@/context";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { defaultDate, parseDateToBr, parseSecondsToDate } from "@/utils";
import * as schema from "@/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import estado from "@/data/cidades";
import delegacias from "@/data/delegacias";
import opm from "@/data/opm";
import * as util from "@/utils";
import axios from "axios";
import SelectReact  from "react-select";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  // Add more options
];

const token = "1i9DXC0Fw1tw6Kkioshc1ODowiqrd";

const url = (lat1, long1, lat2, long2) =>
  `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${lat1},${long1}&destinations=${lat2},${long2}&key=${token}`;

const FormExpenses = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const auth = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    data.userId = auth.token;
    data.date = parseDateToBr(data.date);
    data.lat = parseFloat(data.lat);
    data.long = parseFloat(data.long);

    const coord_delegacias = delegacias.features.find(
      (item) => item.properties.nome === data.delegacia
    ).geometry.coordinates;

    const result = await axios.get(
      url(data.lat, data.long, coord_delegacias[1], coord_delegacias[0])
    );

    data.dist = result.data.rows[0].elements[0].distance.value / 1000;
    data.duration = result.data.rows[0].elements[0].duration.value / 60;

    console.log(result);

    if (router.query.id)
      await update("tco", router.query.id, data).then(() =>
        router.push("/tco")
      );
    else await create("tco", data).then(() => router.push("/tco"));

    setLoading(false);
  };

  useEffect(() => {
    const routerQuery = router.query;

    const routerQueryKeys = Object.keys(routerQuery);

    routerQueryKeys.forEach((key) => {
      setValue(key, routerQuery[key]);
    });
  }, []);

  console.log(opm.find((item) => item.value === auth.opm));
  console.log(auth);

  return (
    <Stack p={[2, 20]} w="95%" mx="auto">
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
        <Select title="Cidade" {...register("city")}>
          {estado.cidades.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </Select>
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
        <Input
          title="Latitude"
          type="text"
          errors={errors.lat}
          {...register("lat")}
        />
        <Input
          title="Longitude"
          type="text"
          errors={errors.long}
          {...register("long")}
        />
        <Select
          title="Responsável peticionamento"
          {...register("responsavel_peticionamento")}
        >
          {opm
            .find((item) => item.value === auth.opm)
            .sub.map((item, index) => {
              const result = opm.find((obj) => obj.value === item);
              return (
                <option value={result.value} key={index}>
                  {result.name}
                </option>
              );
            })}
        </Select>
        <Select title="Delegacia" {...register("delegacia")}>
          {delegacias.features.map((item, index) => (
            <option value={item.properties.nome} key={index}>
              {item.properties.nome}
            </option>
          ))}
        </Select>
        <SignaturePad />
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

export default WithAuth(FormExpenses);
