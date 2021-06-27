import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Control = (props: Props) => {
  return (
    <Flex p={4} flexDir="column" alignItems="center">
      <Heading variant="h3">Control</Heading>
    </Flex>
  );
};

export default Control;
