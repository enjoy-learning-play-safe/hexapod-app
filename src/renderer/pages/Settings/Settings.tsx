import { Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

import HexapodMicrocontroller from './HexapodMicrocontroller';
import HexapodServer from './HexapodServer';
import PageWrapper from '../PageWrapper';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Settings = (props: Props) => {
  return (
    <PageWrapper p={6}>
      <Heading mt={4} mb={4}>
        Settings
      </Heading>
      <Heading variant="h5" mb={2}>
        General
      </Heading>
      <Text>// todo: Main settings go here</Text>
      <HexapodMicrocontroller />
      {/* <HexapodServer /> */}
    </PageWrapper>
  );
};

export default Settings;
