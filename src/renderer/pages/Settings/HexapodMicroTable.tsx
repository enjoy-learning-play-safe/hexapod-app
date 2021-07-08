import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';
import { Port } from '_/renderer/context';

type DataItem = Port;

interface Props {
  data: DataItem[];
}

const HexapodMicroTable = (props: Props) => {
  const { data } = props;
  return (
    <Table variant="simple">
      <TableCaption>Imperial to metric conversion factors</TableCaption>
      <Thead>
        <Tr>
          <Th>locationId</Th>
          <Th>path</Th>
          <Th>productId</Th>
          <Th>vendorId</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item) => (
          <React.Fragment key={item.path}>
            <Tr>
              <Td>{item.locationId}</Td>
              <Td>{item.path}</Td>
              <Td>{item.productId}</Td>
              <Td>{item.vendorId}</Td>
            </Tr>
          </React.Fragment>
        ))}
      </Tbody>
      <Tfoot></Tfoot>
    </Table>
  );
};

export default HexapodMicroTable;
