import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Image,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { HeadComp, Input, InputNumber, Select } from "@/components";
import { create, signUp, storage, update, uploadImage } from "@/firebase";
import { WithAuth } from "@/hooks";
import { useAuth } from "@/context";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { ref } from "firebase/storage";

const FormPersonal = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const auth = useAuth();
  const router = useRouter();

  const hiddenFileInput = useRef(null);

  const [selectedFile, setSelectedFile] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    const storageRef = ref(storage, selectedFile.name);
    const url = await uploadImage(storageRef, selectedFile);

    data.userId = auth.token;
    data.imgUrl = url;
    if (router.query.id)
      update("users", router.query.id, data).then(() =>
        router.push("/personal")
      );
    console.log(url);

    setLoading(false);
  };

  useEffect(() => {
    setValue("name", router.query.name);
    setValue("address", router.query.address);
    setValue("age", router.query.age);
  }, []);

  const handleImg = () => {
    hiddenFileInput.current.click();
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
    }
  }

  return (
    <Stack p={[2,20]}>
      <HeadComp title="Dados pessoais" />
      <Heading as="h2" textAlign="center" mb={6}>
        Registro
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Image
          boxSize="200px"
          borderRadius="100%"
          objectFit="cover"
          src={!selectedFile ? router.query.img : previewImage}
          onClick={handleImg}
          cursor="pointer"
          _hover={{
            opacity: 0.5,
          }}
        />
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={(e) => handleImgChange(e)}
          style={{ display: "none" }}
        />
        <Input
          title="Nome"
          type="text"
          errors={errors?.name}
          {...register("name")}
          defaultValue="teste"
        />
        <Input
          title="Endereço"
          type="text"
          errors={errors?.address}
          {...register("address")}
          defaultValue="teste"
        />
        <InputNumber
          title="Idade"
          errors={errors?.age}
          {...register("age")}
          defaultValue={10}
        />
        <Button isLoading={loading} colorScheme="blue" size="lg" width="100%" mb={4} type="submit">
          Registro
        </Button>
      </form>
    </Stack>
  );
};

export default WithAuth(FormPersonal);
