import {
  Button,
  Heading,
  Image,
  Stack,
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
import { organograma } from "@/data";

const FormExpenses = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema.tco) });

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
        <Select title="Cidade" {...register("city")} isRequired>
          {estado.cidades.map((item, index) => (
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
          defaultValue="Poço"
        />
        <Input
          isRequired
          title="Nº TCO"
          type="text"
          errors={errors?.n_tco}
          {...register("n_tco")}
          defaultValue="48435215315"
        />
        <Input
          isRequired
          title="Nº processo"
          type="text"
          errors={errors?.n_process}
          {...register("n_process")}
          defaultValue="546664"
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
        <Select
          isRequired
          title="Responsável peticionamento"
          {...register("responsavel_peticionamento")}
        >
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
        <Select title="Delegacia" {...register("delegacia")} isRequired>
          {delegacias.features.map((item, index) => (
            <option value={item.properties.nome} key={index}>
              {item.properties.nome}
            </option>
          ))}
        </Select>
        {!router.query.id ? (
          <div>
            <ReactSignatureCanvas
              penColor="black"
              canvasProps={{ width: 1200, height: 200 }}
              ref={sigCanvas}
            />
            <button onClick={clearSignature}>Limpar Assinatura</button>
          </div>
        ) : (
          <Image
            objectFit="cover"
            cursor="pointer"
            src={router.query.signatureImgUrl}
            onClick={modalSignature.onOpen}
          />
        )}
        <InputImage setSelectedFile={setImgAutor} accessor="imgUrl" x="10" />
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
