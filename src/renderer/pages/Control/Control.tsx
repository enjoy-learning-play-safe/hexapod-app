import React, { FC, useContext } from 'react';
import { Spacer, Flex, Button } from '@chakra-ui/react';

import PageWrapper from '../PageWrapper';
import ControlInput from './ControlInput';
import { Context as SerialportContext } from '_/renderer/context/SerialportContext';

import LiveInput from './LiveInput';
import SelectConfig from './SelectConfig';

const Control: FC = () => {
  const { state: serialportState, dispatch: serialportDispatch } =
    useContext(SerialportContext);

  const handleInitClick = () => {
    serialportDispatch({ type: 'INITIALIZE' });
  };
  const handleHomeClick = () => {
    serialportDispatch({ type: 'HOME' });
  };

  return (
    <PageWrapper>
      <Flex mb={4} alignItems="center">
        <SelectConfig />
        <Spacer />
        <Flex>
          <Button mr={2} onClick={handleInitClick}>
            Initialize
          </Button>
          <Button onClick={handleHomeClick}>Home</Button>
        </Flex>
        <Spacer />
        <LiveInput />
      </Flex>
      <ControlInput />
    </PageWrapper>
  );
};

export default Control;
