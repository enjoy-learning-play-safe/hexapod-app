import React from 'react';

import { Button, Flex, Spacer } from '@chakra-ui/react';

import ControlSlider from './ControlSlider';
import LoadConfigMenu from './LoadConfigMenu';
import _ from 'lodash';
import { axisNames } from './Control';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  axesState: Record<string, number>;
  updateAxis: (axisKey: string, value: number) => void;
  resetAxes: () => void;
  updateAxisOnEndChange: (axisKey: string, value: number) => Promise<void>;
}

interface AxesMaxProps {
  key: 'x' | 'y' | 'z' | 'roll' | 'pitch' | 'yaw';
  value: number;
}

const ControlInput = (props: Props) => {
  const { axesState, updateAxis, resetAxes } = props;

  const axes = Object.entries(axesState).map(([key, value]) => ({
    key,
    value,
  }));

  return (
    <>
      {axes.map(({ key: axis, value }: AxesMaxProps) => {
        const axisName: string = axisNames[axis];

        const setSliderValue = (value: number) => updateAxis(axis, value);
        const setSliderValueOnEndChange = async (value: number) =>
          updateAxis(axis, value);

        return (
          <React.Fragment key={axis}>
            <ControlSlider
              axisName={axisName}
              sliderValue={value}
              setSliderValue={setSliderValue}
              setSliderValueOnEndChange={setSliderValueOnEndChange}
            />
          </React.Fragment>
        );
      })}
      <Spacer />
      <Flex alignSelf="stretch" mt={4}>
        <Button onClick={resetAxes}>Reset All Axes</Button>
        <Spacer />
        <Button mr="4">Save Config</Button>
        <LoadConfigMenu />
      </Flex>
    </>
  );
};

export default ControlInput;
