import { Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Home = (props: Props) => {
  return (
    <Flex p={4} flexDir="column" alignItems="center">
      <Heading variant="h3">Home</Heading>
    </Flex>
  );
};

export default Home;
