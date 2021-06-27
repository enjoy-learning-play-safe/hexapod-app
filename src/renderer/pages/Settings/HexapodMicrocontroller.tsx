// eslint-disable-next-line object-curly-newline
import { Box, Button, Heading, Icon, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { IoCheckmark, IoClose } from 'react-icons/io5';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const HexapodMicrocontroller = (props: Props) => {
  const [connectionState, setConnectionState] = useState(false);

  const handleClickConnectSerialport = () => {
    // todo: handle ipcRenderer here (after adding ipcMain)
    setConnectionState(!connectionState);
  };

  return (
    <Box>
      <Heading variant="h5" mt={6} mb={2}>
        Hexapod Microcontroller
      </Heading>
      <Text mb={2}>
        Status:
        {' '}
        <Text
          fontWeight="medium"
          display="inline"
          color={connectionState ? 'green.500' : 'red.500'}
        >
          <Icon as={connectionState ? IoCheckmark : IoClose} mb={1} />
          {' '}
          {connectionState ? 'Connected' : 'Not connected'}
        </Text>
      </Text>
      <Button
        w="16em"
        onClick={handleClickConnectSerialport}
        alignSelf="flex-start"
      >
        {connectionState ? 'Disconnect' : 'Connect'}
        {' '}
        serialport (USB)
      </Button>
    </Box>
  );
};

export default HexapodMicrocontroller;
