import { Flex } from '@chakra-ui/react';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Wrapper = (props: Props) => {
  const { children } = props;
  return (
    <Flex flexDirection="row" alignItems="stretch" flex={1}>
      {children}
    </Flex>
  );
};

export default Wrapper;
