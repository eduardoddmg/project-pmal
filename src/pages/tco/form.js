import {
  Button,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { HeadComp, Input, InputImage, ModalImage, Select } from "@/components";
import { WithAuth } from "@/hooks";
import { useAuth } from "@/context";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { defaultDate } from "@/utils";
import estado from "@/data/cidades";
import delegacias from "@/data/delegacias";
import opm from "@/data/opm";
import infracoes from "@/data/infracoes";
import * as util from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import * as schema from "@/schema";
import ReactSignatureCanvas from "react-signature-canvas";
import { tco } from "@/forms";
import { cidades as cities, organograma } from "@/data";
import new_cidades from "@/data/new_cidades";

const FormExpenses = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ resolver: yupResolver(schema.tco) });

  const watchOpm = watch("responsavel_peticionamento");

  const auth = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [loadingCoord, setLoadingCoord] = useState(false);

  const [imgAutor, setImgAutor] = useState("");

  const toast = useToast();
  const modalSignature = useDisclosure();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await tco(data, auth, imgAutor, sigCanvas, router, toast, setLoading);
    } catch (error) {
      console.log(error);
      setLoading(true);
      toast({
        title: "Erro",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const sigCanvas = useRef(null);

  const clearSignature = () => {
    sigCanvas.current.clear();
  };
  useEffect(() => {
    const routerQuery = router.query;

    const routerQueryKeys = Object.keys(routerQuery);

    routerQueryKeys.forEach((key) => {
      setValue(key, routerQuery[key]);
    });
  }, []);

  const setCoord = async () => {
    setLoadingCoord(true);

    await util
      .getCoord()
      .then((coords) => {
        console.log("Coordenadas:", coords);
        setValue("lat", coords.lat);
        setValue("long", coords.long);
      })
      .catch((error) => {
        console.error("Erro:", error.message);
      });
    setLoadingCoord(false);
  };

  const findParent = organograma.find((item) =>
    item.sub.includes(watchOpm)
  )?.name;
  const cidades =
    findParent === "Comando de Policiamento Especializado" ||
    findParent === "Comando de Policiamento de Missões Especiais"
      ? cities.cidades
      : watchOpm
      ? new_cidades.find((item) => item.name === watchOpm).sub
      : null;

  console.log(findParent);
  console.log(cidades);

  return (
    <Stack p={[2, 20]} w="95%" mx="auto">
      <HeadComp title="TCO PMAL" />
      <ModalImage
        url={router.query.signatureImgUrl}
        onOpen={modalSignature.onOpen}
        isOpen={modalSignature.isOpen}
        onClose={modalSignature.onClose}
      />
      <HeadComp title="TCO" />
      <Heading as="h2" textAlign="center" mb={6}>
        Registro - TCO
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          isRequired
          title="Data"
          type="date"
          errors={errors?.date}
          {...register("date")}
          defaultValue={defaultDate()}
        />
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
        <Select
          isRequired
          title="Responsável peticionamento"
          {...register("responsavel_peticionamento")}
        >
          <option value="">Selecione...</option>
          {auth.admin ? (
            organograma.map((item) =>
              item.sub.map((opm) => <option value={opm}>{opm}</option>)
            )
          ) : auth.comando ? (
            organograma
              .find((item) => item.name === auth.comando)
              .sub.map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item}
                  </option>
                );
              })
          ) : (
            <option value={auth.opm}>{auth.opm}</option>
          )}
        </Select>
        <Select
          title="Cidade"
          {...register("city")}
          isRequired
          helper={!watchOpm && "Primeiro selecione o item acima"}
        >
          {!watchOpm && <option value="">Selecione...</option>}
          {cidades?.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </Select>
        <Input
          isRequired
          title="Bairro"
          type="text"
          errors={errors?.bairro}
          {...register("bairro")}
        />
        <Input
          isRequired
          title="Nº TCO"
          type="text"
          errors={errors?.n_tco}
          {...register("n_tco")}
        />
        <Input
          isRequired
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
          isRequired
          title="Latitude"
          type="text"
          errors={errors.lat}
          {...register("lat")}
        />
        <Input
          isRequired
          title="Longitude"
          type="text"
          errors={errors.long}
          {...register("long")}
        />
        <Button
          colorScheme="blue"
          onClick={setCoord}
          isLoading={loadingCoord}
          mb={5}
        >
          Gerar coordenadas
        </Button>
        <Select title="Delegacia" {...register("delegacia")} isRequired>
          {delegacias.features.map((item, index) => (
            <option value={item.properties.nome} key={index}>
              {item.properties.nome}
            </option>
          ))}
        </Select>
        {!router.query.id ? (
          <div>
            <Text>Assinatura PM</Text>
            <ReactSignatureCanvas
              penColor="black"
              canvasProps={{ width: 1200, height: 200 }}
              ref={sigCanvas}
            />
            <button onClick={clearSignature}>Limpar Assinatura</button>
          </div>
        ) : (
          <>
            <Text>Assinatura PM</Text>
            <Image
              objectFit="cover"
              cursor="pointer"
              src={router.query.signatureImgUrl}
              onClick={modalSignature.onOpen}
            />
          </>
        )}
        <Text>Imagem PM</Text>
        <InputImage setSelectedFile={setImgAutor} accessor="imgUrl" x="10" />
        <Select
          title="Apreensão de material"
          {...register("apreensao_material")}
        >
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </Select>
        <Select title="Depósito" {...register("deposito")}>
          <option value="interno">Interno</option>
          <option value="externo">Externo</option>
        </Select>
        <Select title="Status" {...register("status")}>
          <option value="custodia">Custódia</option>
          <option value="liberado">Liberado</option>
        </Select>
        <Input
          title="Nome do PM"
          type="text"
          errors={errors.pm_name}
          {...register("pm_name")}
        />
        <Input
          title="Matrícula do PM"
          type="text"
          errors={errors.pm_mat}
          {...register("pm_mat")}
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

export default WithAuth(FormExpenses);
