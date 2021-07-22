import React, { useContext } from 'react';

import { Button, Flex, Spacer } from '@chakra-ui/react';

import ControlSlider from './ControlSlider';
import LoadConfigMenu from './LoadConfigMenu';
import _ from 'lodash';

import {
  State as SixDofState,
  Axis as SixDofAxis,
  AxisData as SixDofAxisData,
} from '_renderer/context/SixDofContext';

import {
  Context as ControlContext,
  Types as ControlTypes,
  Axis as ControlAxis,
  Axis,
} from '_renderer/context/ControlContext';
import { AxisData } from '_/renderer/context/ControlContext/state';

type AxesArrayItem = {
  key: Axis;
  value: AxisData;
};

const ControlInput = () => {
  const { state: controlState, dispatch: controlDispatch } =
    useContext(ControlContext);

  const updateAxis = async (axis: ControlAxis, value: number) => {
    controlDispatch({
      type: ControlTypes.SET_AXES,
      payload: { axes: { [axis]: value } },
    });
  };

  const resetAxes = () => {
    controlDispatch({ type: ControlTypes.RESET_AXES });
  };

  const axes: AxesArrayItem[] = Object.entries(controlState.axes).map(
    ([key, value]) => {
      return {
        key: key as SixDofAxis,
        value,
      };
    }
  );

  return (
    <>
      {axes.map(({ key: axis, value }) => {
        const setSliderValue = (value: number) => updateAxis(axis, value);
        const setSliderValueOnEndChange = (value: number) =>
          updateAxis(axis, value);

        return (
          <React.Fragment key={axis}>
            <ControlSlider
              axisName={value.name}
              sliderValue={value.current}
              min={value.min}
              max={value.max}
              setSliderValue={setSliderValue}
              setSliderValueOnEndChange={setSliderValueOnEndChange}
              loading={value.loading}
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
