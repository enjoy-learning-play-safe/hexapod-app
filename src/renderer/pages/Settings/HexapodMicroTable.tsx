import React, { useContext } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
} from '@chakra-ui/react';
import { Port, SerialportContext } from '_/renderer/context';

type DataItem = Port;

interface Props {
  data: DataItem[];
}

const HexapodMicroTable = (props: Props) => {
  const { data } = props;

  const { state, dispatch } = useContext(SerialportContext);

  const handleConnectButtonClick = (path: string) => {
    dispatch({ type: 'OPEN', port: path });
  };

  return (
    <Table variant="simple">
      <TableCaption>Imperial to metric conversion factors</TableCaption>
      <Thead>
        <Tr>
          <Th>locationId</Th>
          <Th>path</Th>
          <Th>productId</Th>
          <Th>vendorId</Th>
          <Th size="sm">Connect</Th>
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
              <Td>
                <Button onClick={() => handleConnectButtonClick(item.path)}>
                  Connect
                </Button>
              </Td>
            </Tr>
          </React.Fragment>
        ))}
      </Tbody>
      <Tfoot></Tfoot>
    </Table>
  );
};

export default HexapodMicroTable;
