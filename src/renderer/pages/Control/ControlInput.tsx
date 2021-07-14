import React from 'react';

import { Button, Flex, Spacer } from '@chakra-ui/react';

import ControlSlider from './ControlSlider';
import LoadConfigMenu from './LoadConfigMenu';
import _ from 'lodash';

import {
  State as SixDofState,
  Axis as SixDofAxis,
  AxisData as SixDofAxisData,
} from '_renderer/context/SixDofContext';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  axesState: SixDofState['axes'];
  liveInput: boolean;
  updateAxis: (axisKey: string, value: number) => void;
  resetAxes: () => void;
  updateAxisOnEndChange: (axisKey: string, value: number) => Promise<void>;
}

interface AxesArrayItem {
  key: SixDofAxis;
  value: SixDofAxisData;
}

const ControlInput = (props: Props) => {
  const { axesState, updateAxis, resetAxes } = props;

  const axes: AxesArrayItem[] = Object.entries(axesState).map(
    ([key, value]) => {
      return {
        key: key as SixDofAxis,
        value,
      };
    }
  );

  return (
    <>
      {axes.map(({ key: axis, value }: AxesArrayItem) => {
        const axisName = value.name;

        const setSliderValue = (value: number) => updateAxis(axis, value);
        const setSliderValueOnEndChange = async (value: number) =>
          updateAxis(axis, value);

        return (
          <React.Fragment key={axis}>
            <ControlSlider
              axisName={axisName}
              sliderValue={value.current}
              min={value.min}
              max={value.max}
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
