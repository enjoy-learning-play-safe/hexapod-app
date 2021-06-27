import { Flex } from '@chakra-ui/react';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  children: React.ReactNode;
}

const Content = (props: Props) => {
  const { children } = props;
  return (
    <Flex flex={1} flexDirection="column">
      {children}
    </Flex>
  );
};

export default Content;
