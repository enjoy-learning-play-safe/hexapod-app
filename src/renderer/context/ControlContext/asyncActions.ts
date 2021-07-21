import { Action, AsyncAction } from './actions';
import { State, initialState } from './state';
import { Reducer } from 'react';
import { AsyncActionHandlers } from 'use-reducer-async';
import Types from './types';
import { gcode } from '_/renderer/formulae/gcode';
import {
  baseCoordsTestData,
  constants,
  newAxesTestData,
  newAxesTestData30,
  platformCoordsBasisTestData,
  platformCoordsHomeTestData,
  platformCoordsTestData,
  previousInputTestData,
} from '_/renderer/fixtures/testFixtures';

export const asyncActionHandlers: AsyncActionHandlers<
  Reducer<State, Action>,
  AsyncAction
> = {
  // todo: add init+home here
  [Types.INIT_ARDUINO]:
    ({ dispatch }) =>
    async (action) => {
      // step 1: math stuff:
      // todo
      dispatch({
        type: Types.INNER_INITIALIZE_STATE,
      });

      // step 2: flush serialport
      // todo

      // step 3: write gcode to serialport
      // todo
    },

  [Types.SET_AXES]:
    ({ dispatch, getState }) =>
    async (action) => {
      // step 0: update axes in state
      dispatch({
        type: Types.INNER_SET_STATE_AXES,
        payload: { axes: action.payload.axes },
      });
      // step 1: take the 6dof array and calculate gcode from that
      const state: State = getState();

      const t0 = performance.now();

      const gcodeRes = gcode(
        // ! DEBUG
        platformCoordsHomeTestData,
        newAxesTestData30,
        previousInputTestData,
        platformCoordsBasisTestData,
        platformCoordsHomeTestData,
        constants.fixedRodsLength,
        baseCoordsTestData,
        constants.maxChangePerSlice,
        constants.minimumSlicePerMovement
      );

      console.log('gcodeRes', gcodeRes);

      const t1 = performance.now();

      console.log(`Call to calculate gcode took ${t1 - t0} milliseconds.`);

      //
      // step 2: send the gcode via serialport
      // todo: move serial port code to some function within the control context (thus replacing the serialportContext context)
    },
  [Types.RESET_AXES]:
    ({ dispatch }) =>
    async (action) => {
      // step 0: update axes in state
      dispatch({
        type: Types.INNER_RESET_STATE_AXES,
      });
      // step 1: take the 6dof array and calculate gcode from that
      //
      // step 2: send the gcode via serialport
      // todo: move serial port code to some function within the control context (thus replacing the serialportContext context)
    },
};
