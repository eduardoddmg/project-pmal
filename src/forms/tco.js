import { create, storage, update, uploadImage } from "@/firebase";
import { parseDateToBr } from "@/utils";
import delegacias from "@/data/delegacias";
import * as util from "@/utils";
import axios from "axios";
import { ref } from "firebase/storage";

const getDelegaciaCoordinates = (delegaciaName) => {
  const delegacia = delegacias.features.find(
    (item) => item.properties.nome === delegaciaName
  );
  return delegacia ? delegacia.geometry.coordinates : [];
};

const options = (startLatitude, startLongitude, endLatitude, endLongitude) => ({
  method: "GET",
  url: "https://distance-calculator8.p.rapidapi.com/calc",
  params: {
    startLatitude,
    startLongitude,
    endLatitude,
    endLongitude,
  },
  headers: {
    "X-RapidAPI-Key": "ee65f71fc9mshb03c4f4814f015fp1c732cjsn090deaf9f730",
    "X-RapidAPI-Host": "distance-calculator8.p.rapidapi.com",
  },
});

// Função para fazer a requisição HTTP
const fetchData = async (data) => {
  const { lat, long, delegacia } = data;
  const coord_delegacias = getDelegaciaCoordinates(delegacia);

  if (coord_delegacias.length === 0) {
    throw new Error("Delegacia não encontrada");
  }

  const [endLongitude, endLatitude] = coord_delegacias;
  const {
    data: {
      body: {
        distance: { kilometers },
      },
    },
  } = await axios.request(options(lat, long, endLatitude, endLongitude));

  return kilometers;
};

// Função para processar dados e atualizar o estado
export const tco = async (
  data,
  auth,
  selectedFile,
  sigCanvas,
  router,
  toast,
  setLoading
) => {
  setLoading(true);
  try {
    data.userId = auth.token;
    data.date = parseDateToBr(data.date);
    data.lat = parseFloat(data.lat);
    data.long = parseFloat(data.long);

    const dist = await fetchData(data);
    data.dist = dist;
    data.duration = util.calculateTravelTime(dist, 80);

    const storageRef = ref(storage, selectedFile.name);
    const imgUrl = await uploadImage(storageRef, selectedFile);
    data.imgUrl = imgUrl;

    const signatureStorageRef = ref(
      storage,
      `assinatura-autor-TCO: ${new Date().getTime()}.png`
    );
    const signatureDataUrl = sigCanvas.current.toDataURL("image/png");
    const base64Response = await fetch(signatureDataUrl);
    const blob = await base64Response.blob();
    const signatureImgUrl = await uploadImage(signatureStorageRef, blob);
    data.signatureImgUrl = signatureImgUrl;

    if (router.query.id) {
      await update("tco", router.query.id, data);
      router.push("/tco");
      toast({
        title: "TCO atualizado com sucesso",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      await create("tco", data);
      router.push("/tco");
      toast({
        title: "TCO cadastrado com sucesso",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  } catch (error) {
    console.log(error);
    toast({
      title: "Algo deu errado",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  } finally {
    setLoading(false);
  }
};
