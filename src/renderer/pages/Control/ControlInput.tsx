import React from 'react';

import { Button, Flex, Icon, Spacer } from '@chakra-ui/react';

import ControlSlider from './ControlSlider';
import LoadConfigMenu from './LoadConfigMenu';
import _ from 'lodash';

import { IoRefreshOutline, IoSaveOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import {
  AxesNumber,
  Axis,
  AxisData,
  State as ControlState,
} from '_/renderer/store/ducks/control/types';
import { updateAxes } from '_/renderer/store/ducks/control/actions';

type AxesArrayItem = {
  key: Axis;
  value: AxisData;
};

const ControlInput = () => {
  const dispatch = useDispatch();

  const controlState: ControlState = useSelector((state: any) => state.control); // ! dont use any type

  const updateAxis = async (axis: Axis, value: number) => {
    console.log('updateAxis', axis, value);
    const newAxes = { [axis]: value } as AxesNumber;
    // controlDispatch({
    //   type: ControlTypes.SET_AXES,
    //   payload: { axes: newAxes },
    // });
    dispatch(updateAxes(newAxes));
  };

  const resetAxes = () => {
    // controlDispatch({ type: ControlTypes.RESET_AXES });
  };

  const axes: AxesArrayItem[] = Object.entries(controlState.axes).map(
    ([key, value]) => {
      return {
        key: key as Axis,
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
        <Button onClick={resetAxes} leftIcon={<Icon as={IoRefreshOutline} />}>
          Reset All Axes
        </Button>
        <Spacer />
        <Button mr="4" leftIcon={<Icon as={IoSaveOutline} />}>
          Save Config
        </Button>
        <LoadConfigMenu />
      </Flex>
    </>
  );
};

export default ControlInput;
