// eslint-disable-next-line object-curly-newline
import React, { useState } from 'react';

import { Box, Button, Heading, Icon, Text, Flex } from '@chakra-ui/react';
import { IoCheckmark, IoClose } from 'react-icons/io5';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const HexapodMicrocontroller = (props: Props) => {
  const [connectionState, setConnectionState] = useState(false);

  const handleClickConnectSerialport = async () => {
    // todo: handle ipcRenderer here (after adding ipcMain)
    setConnectionState(!connectionState);
    await window.electron.ipcRenderer.invoke('serialport', 'myData');
  };

  return (
    <Box>
      <Heading variant="h5" mt={6} mb={2}>
        Hexapod Microcontroller
      </Heading>
      <Text fontSize="0.9em" mb={2}>
        Connect to Hexapod via Microcontroller over USB
      </Text>
      <Flex>
        <Text mb={2}>Status: </Text>
        <Text
          fontWeight="medium"
          display="inline"
          color={connectionState ? 'green.500' : 'red.500'}
        >
          <Icon as={connectionState ? IoCheckmark : IoClose} mb={1} />{' '}
          {connectionState ? 'Connected' : 'Not connected'}
        </Text>
      </Flex>
      <Button
        w="16em"
        onClick={handleClickConnectSerialport}
        alignSelf="flex-start"
      >
        {connectionState ? 'Disconnect' : 'Connect'} serialport (USB)
      </Button>
    </Box>
  );
};

export default HexapodMicrocontroller;
