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
  Alert,
  AlertIcon,
  AlertTitle,
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
      <Flex alignItems="center">
        <Box>
          <Heading variant="h5" mt={6} mb={2}>
            Hexapod Microcontroller
          </Heading>
          <Text fontSize="0.9em" mb={2}>
            Connect to Hexapod via Microcontroller over USB
          </Text>
        </Box>
        <Spacer />
        <Button
          borderRadius="lg"
          onClick={handleRefreshListClick}
          aria-label="Refresh"
          leftIcon={<IoRefresh />}
        >
          Refresh devices
        </Button>
      </Flex>
      <Alert status={connected ? 'success' : 'warning'}>
        <AlertIcon />
        <AlertTitle mr={2}>
          {connected ? 'Connected to device' : 'Not connected'}
        </AlertTitle>
      </Alert>
      <HexapodMicroTable data={list} />
    </Box>
  );
};

export default HexapodMicrocontroller;
