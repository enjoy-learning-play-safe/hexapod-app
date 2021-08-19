import { Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { IoGameController } from 'react-icons/io5';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const TitleBar = (props: Props) => {
  return (
    <Flex
      flexDirection="row"
      height="40px" // 10 chakra units
      width="100%"
      px={20}
      alignItems="center"
      justifyContent="center"
      className="electron-draggable"
      bg="brand.500"
    >
      <Text fontWeight="600" color="black">
        <Icon as={IoGameController} mr={2} mb={1} boxSize="1.25em" />
        Hexapod Controller
      </Text>
    </Flex>
  );
};

export default TitleBar;
