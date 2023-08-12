import { useForm } from "react-hook-form";
import { Input, InputGroup, InputLeftElement, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useSearch } from "@/hooks";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export const SearchBar = ({ data, setData, collection, field }) => {
  const { register, handleSubmit } = useForm();

  const search = useSearch(data, collection, field);

  return (
    <form>
      <InputGroup my={5}>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          type="text"
          placeholder="Pesquisar..."
          size="md"
          w={["full", "full", "50%"]}
          borderRadius="full"
          borderColor="gray.300"
          _focus={{ borderColor: "blue.400", boxShadow: "outline" }}
          {...register("searchQuery", { shouldUnregister: true })}
          onChange={e => setData(search.searchField(e.target.value))}
        />
      </InputGroup>
    </form>
  );
};
