import React, { FC, useContext } from 'react';
import { Spacer, Flex, Button, Icon } from '@chakra-ui/react';

import PageWrapper from '../PageWrapper';
import ControlInput from './ControlInput';
import { Context as SerialportContext } from '_/renderer/context/SerialportContext';

import LiveInput from './LiveInput';
import SelectConfig from './SelectConfig';
import { IoCodeWorkingOutline, IoHomeOutline } from 'react-icons/io5';

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
          <Button
            mr={2}
            onClick={handleInitClick}
            leftIcon={<Icon as={IoCodeWorkingOutline} />}
          >
            Initialize
          </Button>
          <Button
            onClick={handleHomeClick}
            leftIcon={<Icon as={IoHomeOutline} />}
          >
            Home
          </Button>
        </Flex>
        <Spacer />
        <LiveInput />
      </Flex>
      <ControlInput />
    </PageWrapper>
  );
};

export default Control;
