import React from 'react';

import { calc, Flex, FlexProps } from '@chakra-ui/react';

interface Props extends FlexProps {
  children: React.ReactNode;
}

const PageWrapper = (props: Props): JSX.Element => {
  const { children, ...passedProps } = props;
  return (
    <Flex
      flexDirection="column"
      flex={1}
      p={4}
      overflowY="auto"
      overflowX="hidden"
      maxHeight={'calc(100vh - 40px)'}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...passedProps}
    >
      {children}
    </Flex>
  );
};

export default PageWrapper;
