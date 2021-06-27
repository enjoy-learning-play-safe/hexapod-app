import { Flex } from '@chakra-ui/react';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Container: React.FC = (props: Props) => {
  const { children } = props;
  return (
    <Flex flexDirection="column" height="100vh" width="100vw">
      {children}
    </Flex>
  );
};

export default Container;
