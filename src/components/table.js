import React from "react";
import * as Chakra from "@chakra-ui/react";
import { Loading } from "./loading";
import {
  AiFillCloseCircle,
  AiFillEdit,
  AiFillInfoCircle,
} from "react-icons/ai";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Select } from "./input";

export const Table = ({
  loading,
  data,
  columns,
  view,
  edit,
  remove,
  children,
  showActions,
  hiddenView,
  hiddenDelete,
  hiddenEdit,
  ...rest
}) => {
  const [itemsPerPage, setItemsPerPage] = React.useState(3);
  const [currentPage, setCurrentPage] = React.useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  console.log(data);

  if (!loading && data?.length === 0)
    return (
      <Chakra.Center py={10}>
        <Chakra.Heading>Não há nenhum item cadastrado</Chakra.Heading>
      </Chakra.Center>
    );
  if (!loading)
    return (
      <>
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
              {data?.slice(startIndex, endIndex).map((item) => {
                return (
                  <Chakra.Tr>
                    {columns?.map((column, index) => {
                      return (
                        <Chakra.Td key={index}>
                          {item[column.accessor]}
                        </Chakra.Td>
                      );
                    })}
                    <Chakra.Td display={!showActions && "none"}>
                      <Chakra.Button
                        display={hiddenView && "none"}
                        colorScheme="blue"
                        variant="ghost"
                        fontSize="30px"
                        onClick={() => view(item.id)}
                      >
                        <AiFillInfoCircle />
                      </Chakra.Button>
                    </Chakra.Td>
                    <Chakra.Td display={!showActions && "none"}>
                      <Chakra.Button
                        display={hiddenEdit && "none"}
                        colorScheme="orange"
                        variant="ghost"
                        fontSize="30px"
                        onClick={() => edit(item)}
                      >
                        <AiFillEdit />
                      </Chakra.Button>
                    </Chakra.Td>
                    <Chakra.Td display={!showActions && "none"}>
                      <Chakra.Button
                        display={hiddenDelete && "none"}
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
        {data && data.length > 0 && (
          <Chakra.Stack>
            <Chakra.Flex justify="space-between">
              <Select w={["100%", "20%"]} onChange={(e) => setItemsPerPage(e.target.value)}>
                <option value={itemsPerPage}>Selecione</option>
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Select>
              <Chakra.Flex justifyContent="flex-end" gap={5} alignSelf="center">
                <Chakra.Button
                  colorScheme="blue"
                  onClick={handlePreviousPage}
                  isDisabled={currentPage === 1}
                >
                  <ArrowLeftIcon />
                </Chakra.Button>
                <Chakra.Circle>
                  <Chakra.Text>{currentPage}</Chakra.Text>
                </Chakra.Circle>
                <Chakra.Button
                  colorScheme="blue"
                  onClick={handleNextPage}
                  isDisabled={endIndex >= data.length}
                >
                  <ArrowRightIcon />
                </Chakra.Button>
              </Chakra.Flex>
            </Chakra.Flex>
          </Chakra.Stack>
        )}
      </>
    );
  else return <Loading />;
};
