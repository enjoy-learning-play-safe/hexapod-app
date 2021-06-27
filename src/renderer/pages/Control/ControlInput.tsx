import React from 'react';

import { Button, Flex, Spacer } from '@chakra-ui/react';

import ControlSlider from './ControlSlider';
import LoadConfigMenu from './LoadConfigMenu';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  axes: string[];
}

const ControlInput = (props: Props) => {
  const { axes } = props;
  return (
    <>
      {axes.map((axisName) => (
        <React.Fragment key={axisName}>
          <ControlSlider axisName={axisName} />
        </React.Fragment>
      ))}
      <Spacer />
      <Flex alignSelf="stretch" mt={4}>
        <Button>Reset All Axes</Button>
        <Spacer />
        <Button mr="4">Save Config</Button>
        <LoadConfigMenu />
      </Flex>
    </>
  );
};

export default ControlInput;
