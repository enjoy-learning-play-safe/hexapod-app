import { Button, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Settings = (props: Props) => {
  return (
    <Flex flexDirection="column" p={4} flexDir="column">
      <Heading variant="h3" textAlign="center" mb={4}>
        Settings
      </Heading>
      <Heading variant="h5" mb={2}>
        General
      </Heading>
      <Text>Main settings go here</Text>
      <Heading variant="h5" mt={6} mb={2}>
        Microcontroller
      </Heading>
      <Button width={300}>Connect via serialport (USB)</Button>
    </Flex>
  );
};

export default Settings;
