import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as InputChakra,
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select as SelectChakra,
  Checkbox as CheckboxChakra,
  Image,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { forwardRef, useEffect, useRef, useState } from "react";
import { PatternFormat } from "react-number-format";
import { Icon } from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const InputPassword = forwardRef((props, ref) => {
  const { title, errors, isRequired, ...rest } = props;

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl isRequired={isRequired} mb={3} isInvalid={errors}>
      <FormLabel>{title}</FormLabel>
      <InputGroup size="md">
        <InputChakra
          ref={ref}
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter password"
          {...rest}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? <Icon as={FiEyeOff} /> : <Icon as={FiEye} />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{errors?.message}</FormErrorMessage>
    </FormControl>
  );
});

export const Input = forwardRef((props, ref) => {
  const { title, errors, type, isRequired, ...rest } = props;

  return (
    <FormControl isRequired={isRequired} mb={3} isInvalid={errors}>
      <FormLabel>{title}</FormLabel>
      <InputChakra
        ref={ref}
        type={type}
        placeholder={title + "..."}
        {...rest}
      />
      <FormErrorMessage>{errors?.message}</FormErrorMessage>
    </FormControl>
  );
});

export const Checkbox = forwardRef((props, ref) => {
  const { title, ...rest } = props;

  return (
    <CheckboxChakra size="md" colorScheme="green" {...rest} ref={ref}>
      {title}
    </CheckboxChakra>
  );
});

export const Select = forwardRef((props, ref) => {
  const { children, title, isRequired, ...rest } = props;

  return (
    <FormControl mb={5} isRequired={isRequired}>
      <FormLabel>{title}</FormLabel>
      <SelectChakra ref={ref} {...rest}>
        {children}
      </SelectChakra>
    </FormControl>
  );
});

export const InputNumberMoney = forwardRef((props, ref) => {
  const {
    isRequired,
    children,
    title,
    defaultValue,
    precision,
    step,
    ...rest
  } = props;

  return (
    <FormControl mb={5} isRequired={isRequired}>
      <FormLabel>{title}</FormLabel>
      <InputGroup w="full">
        <InputLeftAddon children="R$" />
        <NumberInput
          defaultValue={defaultValue}
          w="full"
          precision={precision}
          step={step}
        >
          <NumberInputField ref={ref} {...rest} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </InputGroup>
    </FormControl>
  );
});

export const InputNumber = forwardRef((props, ref) => {
  const { children, title, defaultValue, precision, ...rest } = props;

  return (
    <FormControl mb={5}>
      <FormLabel>{title}</FormLabel>
      <NumberInput defaultValue={defaultValue} precision={precision}>
        <NumberInputField ref={ref} {...rest} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
});

export const InputImage = ({ setSelectedFile, accessor }) => {
  const router = useRouter();

  const [previewImage, setPreviewImage] = useState(
    router.query[accessor] ||
      "https://demos.creative-tim.com/vue-white-dashboard-pro/img/image_placeholder.jpg"
  );
  const hiddenFileInput = useRef(null);

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
  };

  return (
    <>
      <Image
        my={5}
        boxSize="200px"
        objectFit="cover"
        src={previewImage}
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
    </>
  );
};
