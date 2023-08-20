import React from "react";
import * as Chakra from "@chakra-ui/react";
import { Loading } from "./loading";

export const Table = ({ loading, data, columns, children, ...rest }) => {
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
          {children}
          <Chakra.Thead>
            <Chakra.Tr>
              {columns?.map((item) => (
                <Chakra.Th>{item.Header}</Chakra.Th>
              ))}
            </Chakra.Tr>
          </Chakra.Thead>
          <Chakra.Tbody>
            <Chakra.Tr>
              {data?.map(item => {
                {columns?.map(column => <Chakra.Td>{item[column.accessor]}</Chakra.Td>)}
              })}
            </Chakra.Tr>
          </Chakra.Tbody>
        </Chakra.Table>
      </Chakra.TableContainer>
    );
  else return <Loading />;
};
