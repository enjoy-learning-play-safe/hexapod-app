import { Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

import HexapodMicrocontroller from './HexapodMicrocontroller';
import HexapodServer from './HexapodServer';

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
      <HexapodMicrocontroller />
      <HexapodServer />
    </Flex>
  );
};

export default Settings;
