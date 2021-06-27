import React from 'react';

import { Flex } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

const PageWrapper = (props: Props): JSX.Element => {
  const { children } = props;
  return (
    <Flex flexDirection="column" p={4} flexDir="column">
      {children}
    </Flex>
  );
};

export default PageWrapper;
