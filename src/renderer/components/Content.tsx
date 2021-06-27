import React from 'react';

import { Flex } from '@chakra-ui/react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  children: React.ReactNode;
}

const Content = (props: Props) => {
  const { children } = props;
  return (
    <Flex flex={1} flexDirection="column" alignSelf="stretch">
      {children}
    </Flex>
  );
};

export default Content;
