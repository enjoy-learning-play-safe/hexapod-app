import React, { useState } from 'react';

import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  Input,
  useToast,
} from '@chakra-ui/react';
import { IoCheckmark, IoClose } from 'react-icons/io5';

interface Props {}

const HexapodServer = (props: Props) => {
  const [connectionState, setConnectionState] = useState(false);

  const [isConnectionLoading, setConnectionLoading] = useState(false);

  const [serverUrl, setServerUrl] = useState('http://localhost:8000');

  const toast = useToast();

  const handleChangeServerUrl = (event: any) => {
    setServerUrl(event.target.value);
  };

  const handleClickConnectServer = async () => {
    if (!connectionState) {
      setConnectionLoading(true);

      await fetch(`${serverUrl}/connect`)
        .then((res) => res.json())
        .then((json) => {
          console.log('SUCCESS: handleClickConnectServer', json);
          setConnectionState(true);
          toast({
            // title: 'Config Loaded',
            description: 'Connected to Server',
            status: 'success',
            duration: 2500,
            position: 'top-right',
            isClosable: true,
          });
        })
        .catch((err) => {
          console.error('failed to handle handleClickConnectServer', err);
          toast({
            title: 'Failed to Connect to Server',
            description: err.toString(),
            status: 'error',
            duration: 2500,
            position: 'top-right',
            isClosable: true,
          });
        })
        .finally(() => {
          setConnectionLoading(false);
        });
    } else {
      setConnectionState(false);
    }
  };

  return (
    <Box>
      <Heading variant="h5" mt={6} mb={2}>
        Hexapod REST API Server
      </Heading>
      <Text fontSize="0.9em" mb={2}>
        Connect to Hexapod via REST API Server
      </Text>
      <Text mb={2}>
        Status:{' '}
        <Text
          fontWeight="medium"
          display="inline"
          color={connectionState ? 'green.500' : 'red.500'}
        >
          <Icon as={connectionState ? IoCheckmark : IoClose} mb={1} />{' '}
          {connectionState ? 'Connected' : 'Not connected'}
        </Text>
      </Text>
      <Flex>
        <Input
          value={serverUrl}
          onChange={handleChangeServerUrl}
          placeholder="Server URL"
        />
        <Button
          w="14em"
          onClick={handleClickConnectServer}
          alignSelf="flex-start"
          ml={4}
        >
          {connectionState ? 'Disconnect' : 'Connect'}
        </Button>
      </Flex>
    </Box>
  );
};

export default HexapodServer;
