import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

import { useHistory, useLocation } from 'react-router';

interface TabProps {
  children: React.ReactNode;
  href: string;
}

const Tab = (props: TabProps) => {
  const { children, href } = props;
  const history = useHistory();

  const active = useLocation().pathname === href;

  const handleClick = () => {
    history.push(href);
  };

  return (
    <Flex
      as="a"
      cursor="pointer"
      py={1}
      borderRadius="md"
      mx={2}
      justifyContent="center"
      bg={active ? 'brand.500' : 'gray.700'}
      flex={1}
      onClick={handleClick}
    >
      <Text fontWeight="medium">{children}</Text>
    </Flex>
  );
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const AxisConfig = (props: Props) => {
  return (
    <Flex p={4} flexDirection="column">
      <Flex>
        <Tab href="/axis-config">Axis Assignment</Tab>
        <Tab href="/axis-config/limiting">Axis Limiting</Tab>
      </Flex>
    </Flex>
  );
};

export default AxisConfig;
