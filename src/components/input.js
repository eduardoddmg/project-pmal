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
  Checkbox as CheckboxChakra
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { PatternFormat } from "react-number-format";

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
    <CheckboxChakra size='md' colorScheme='green' {...rest} ref={ref}>
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
  const { isRequired, children, title, defaultValue, precision, step, ...rest } = props;

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
