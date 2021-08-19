import React from 'react';
import { Flex, Fade, Button, Text, Switch, Icon } from '@chakra-ui/react';

import { IoArrowUpOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLiveInput,
  writeToArduino,
} from '_/renderer/store/ducks/control/actions';

const LiveInput = () => {
  const dispatch = useDispatch();

  const controlState = useSelector((store: any) => store.control);

  const { liveInput } = controlState;

  const handleClickSendValues = () => {
    dispatch(writeToArduino());
  };

  const handleChangeLiveInput = () => {
    dispatch(setLiveInput(!liveInput));
  };

  return (
    <Flex alignItems="center" alignSelf="flex-start" mt={1}>
      <Fade in={!liveInput}>
        <Button
          size="sm"
          mr={4}
          leftIcon={<Icon as={IoArrowUpOutline} />}
          onClick={handleClickSendValues}
        >
          Send Values
        </Button>
      </Fade>
      <Text fontWeight="medium" mr={2}>
        Live Input
      </Text>
      <Switch
        size="md"
        isChecked={liveInput}
        onChange={handleChangeLiveInput}
        colorScheme="blue"
      />
    </Flex>
  );
};

export default LiveInput;
