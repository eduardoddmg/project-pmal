import React from "react";
import * as Chakra from "@chakra-ui/react";
import { Loading } from "./loading";
import { AiFillCloseCircle, AiFillEdit, AiFillInfoCircle } from "react-icons/ai";

export const Table = ({
  loading,
  data,
  columns,
  view,
  edit,
  remove,
  children,
  ...rest
}) => {
  if (!loading && data?.length === 0)
    return (
      <Chakra.Center py={10}>
        <Chakra.Heading>Não há nenhum item cadastrado</Chakra.Heading>
      </Chakra.Center>
    );
  if (!loading)
    return (
      <Chakra.TableContainer>
        <Chakra.Table overflow="scroll" {...rest}>
          <Chakra.Thead>
            <Chakra.Tr>
              {columns?.map((item, index) => (
                <Chakra.Th key={index}>{item.Header}</Chakra.Th>
              ))}
            </Chakra.Tr>
          </Chakra.Thead>
          <Chakra.Tbody>
            {data?.map((item) => {
              return (
                <Chakra.Tr>
                  {columns?.map((column, index) => {
                    return <Chakra.Td key={index}>{item[column.accessor]}</Chakra.Td>;
                  })}
                  <Chakra.Td>
                    <Chakra.Button
                      colorScheme="blue"
                      variant="ghost"
                      fontSize="30px"
                      onClick={() => view(item.id)}
                    >
                      <AiFillInfoCircle />
                    </Chakra.Button>
                  </Chakra.Td>
                  <Chakra.Td>
                    <Chakra.Button
                      colorScheme="orange"
                      variant="ghost"
                      fontSize="30px"
                      onClick={() => edit(item)}
                    >
                      <AiFillEdit />
                    </Chakra.Button>
                  </Chakra.Td>
                  <Chakra.Td>
                    <Chakra.Button
                      colorScheme="red"
                      variant="ghost"
                      fontSize="30px"
                      onClick={() => remove(item.id)}
                    >
                      <AiFillCloseCircle />
                    </Chakra.Button>
                  </Chakra.Td>
                </Chakra.Tr>
              );
            })}
          </Chakra.Tbody>
        </Chakra.Table>
      </Chakra.TableContainer>
    );
  else return <Loading />;
};
