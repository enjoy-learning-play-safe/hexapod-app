import React, { useReducer, useState } from 'react';

// eslint-disable-next-line object-curly-newline
import {
  Heading,
  Spacer,
  Switch,
  Flex,
  Text,
  Button,
  Fade,
} from '@chakra-ui/react';

import PageWrapper from '../PageWrapper';
import ControlInput from './ControlInput';

export const axisNames = {
  x: 'X',
  y: 'Y',
  z: 'Z',
  roll: 'Roll',
  pitch: 'Pitch',
  yaw: 'Yaw',
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Control = (props: Props): JSX.Element => {
  const axes = ['X', 'Y', 'Z', 'Roll', 'Pitch', 'Yaw'];

  const [liveInput, setLiveInput] = useState(false);

  const handleChangeLiveInput = () => {
    setLiveInput(!liveInput);
  };

  // the following code needs to be refactored (preferrably with context!)

  const AxesInitialState = {
    x: 0,
    y: 0,
    z: 0,
    roll: 0,
    pitch: 0,
    yaw: 0,
  };

  const [axesState, setAxesState] = useState(AxesInitialState);

  const updateAxis = async (axisKey: string, value: number) => {
    //! note, this sends the code twice due to react rerender
    const newAxesState = {
      ...axesState,
      [axisKey]: value,
    };

    // set state:
    setAxesState(newAxesState);

    if (liveInput) {
      await pushToServer(newAxesState);
    }
  };

  const updateAxisOnEndChange = async (axisKey: string, value: number) => {
    if (!liveInput) {
      const newAxesState = {
        ...axesState,
        [axisKey]: value,
      };
      // await pushToServer(newAxesState);
    }
  };

  const pushToServer = async (newAxesState: Record<string, any>) => {
    const queryParams = Object.entries(newAxesState)
      .map(([key, value]) => ({
        key,
        value,
      }))
      .map(({ key, value }) => `${key}=${value}`)
      .join('&');

    await fetch(`http://localhost:8000/hexapod/control?${queryParams}`);
  };

  const onClickSendValues = async () => {
    await pushToServer(axesState);
  };

  const resetAxes = () => {
    setAxesState(AxesInitialState);
  };

  return (
    <PageWrapper>
      <Flex>
        <Heading variant="h3" mb={6}>
          Control Hexapod™
        </Heading>
        <Spacer />
        <Flex alignItems="center" alignSelf="flex-start" mt={1}>
          <Fade in={!liveInput}>
            <Button size="sm" mr={4} onClick={onClickSendValues}>
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
      </Flex>
      <ControlInput
        axesState={axesState}
        updateAxis={updateAxis}
        resetAxes={resetAxes}
        updateAxisOnEndChange={updateAxisOnEndChange}
      />
    </PageWrapper>
  );
};

export default Control;
