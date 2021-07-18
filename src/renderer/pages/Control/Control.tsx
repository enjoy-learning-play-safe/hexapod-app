import React, { useContext, useReducer, useState } from 'react';

// eslint-disable-next-line object-curly-newline
import {
  Heading,
  Spacer,
  Switch,
  Flex,
  Text,
  Button,
  Fade,
  Select,
} from '@chakra-ui/react';

import PageWrapper from '../PageWrapper';
import ControlInput from './ControlInput';
import { Context as SerialportContext } from '_/renderer/context/SerialportContext';
import {
  Context as ControlContext,
  Types as ControlTypes,
  Axis as ControlAxis,
} from '_renderer/context/ControlContext';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Control = (props: Props): JSX.Element => {
  const { state: controlState, dispatch: controlDispatch } =
    useContext(ControlContext);

  const { axes: axesState, liveInput } = controlState;

  const setAxesState = (axis: ControlAxis, value: number) => {
    controlDispatch({
      type: ControlTypes.SET_AXES,
      payload: { axes: { [axis]: value } },
    });
  };

  const setLiveInput = (value: boolean) => {
    controlDispatch({ type: ControlTypes.SET_LIVE_INPUT, payload: value });
  };

  const handleChangeLiveInput = () => {
    setLiveInput(!liveInput);
  };

  // the following code needs to be refactored (preferrably with context!)

  // const [axesState, setAxesState] = useState(AxesInitialState);

  const updateAxis = async (axis: ControlAxis, value: number) => {
    // set state:
    console.log({ axis, value });
    setAxesState(axis, value);
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
    controlDispatch({ type: ControlTypes.RESET_AXES });
  };

  const [selectedConfig, setSelectedConfig] = useState('hexapod');

  const handleSelectonfig: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setSelectedConfig(event.target.value);
  };

  /////

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
        <Select
          value="hexapod"
          placeholder="Select config"
          mt={1}
          w={160}
          size="md"
          variant="filled"
          borderRadius="lg"
          onChange={handleSelectonfig}
          fontWeight="600"
        >
          <option value="hexapod">Hexapod</option>
          <option value="septapod">Septapod</option>
          <option value="octopod">Octopod</option>
        </Select>
        <Spacer />
        <Flex>
          <Button mr={2} onClick={handleInitClick}>
            Initialize
          </Button>
          <Button onClick={handleHomeClick}>Home</Button>
        </Flex>
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
        liveInput={liveInput}
        updateAxis={updateAxis}
        resetAxes={resetAxes}
        updateAxisOnEndChange={updateAxisOnEndChange}
      />
    </PageWrapper>
  );
};

export default Control;
