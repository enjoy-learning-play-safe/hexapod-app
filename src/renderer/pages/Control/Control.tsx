import React, { useState } from 'react';

import { Flex, Heading } from '@chakra-ui/react';

import ControlSlider from './ControlSlider';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Control = (props: Props): JSX.Element => {
  const axes = ['X', 'Y', 'Z', 'Roll', 'Pitch', 'Yaw'];

  return (
    <Flex p={4} flexDir="column" alignItems="center">
      <Heading variant="h3" mb={6}>
        Control
      </Heading>

      {axes.map((axisName) => (
        <ControlSlider axisName={axisName} />
      ))}
    </Flex>
  );
};

export default Control;
