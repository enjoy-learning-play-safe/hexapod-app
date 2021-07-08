// eslint-disable-next-line object-curly-newline
import React, { useContext } from 'react';

import {
  Box,
  Button,
  Heading,
  Icon,
  Text,
  Flex,
  IconButton,
  Spacer,
} from '@chakra-ui/react';
import { IoCheckmark, IoClose, IoRefresh } from 'react-icons/io5';
import { SerialportContext } from '_/renderer/context/SerialportContext';
import HexapodMicroTable from './HexapodMicroTable';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const HexapodMicrocontroller = (props: Props) => {
  const { state, dispatch } = useContext(SerialportContext);
  const { connected, list } = state;

  const portPath = '/dev/smth';

  const handleClickConnectSerialport = async () => {
    // todo: handle ipcRenderer here (after adding ipcMain)
    // setConnectionState(!connectionState);
    await window.electron.ipcRenderer.invoke('serialport', 'myData');
    if (connected) {
      dispatch({ type: 'OPEN', port: portPath });
    } else {
      dispatch({ type: 'CLOSE' });
    }
  };

  const handleRefreshListClick = async () => {
    dispatch({ type: 'LIST' });
  };

  return (
    <Box>
      <Flex>
        <Heading variant="h5" mt={6} mb={2}>
          Hexapod Microcontroller
        </Heading>
        <Spacer />
        <IconButton
          onClick={handleRefreshListClick}
          aria-label="Refresh"
          icon={<IoRefresh />}
        />
      </Flex>
      <Text fontSize="0.9em" mb={2}>
        Connect to Hexapod via Microcontroller over USB
      </Text>
      <HexapodMicroTable data={list} />
      <Flex>
        <Text mb={2}>Status: </Text>
        <Text
          fontWeight="medium"
          display="inline"
          color={connected ? 'green.500' : 'red.500'}
        >
          <Icon as={connected ? IoCheckmark : IoClose} mb={1} />{' '}
          {connected ? 'Connected' : 'Not connected'}
        </Text>
      </Flex>
      <Button
        w="16em"
        onClick={handleClickConnectSerialport}
        alignSelf="flex-start"
      >
        {connected ? 'Disconnect' : 'Connect'} serialport (USB)
      </Button>
    </Box>
  );
};

export default HexapodMicrocontroller;
