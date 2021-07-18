import { Action, AsyncAction } from './actions';
import { State, initialState } from './state';
import { Reducer } from 'react';
import { AsyncActionHandlers } from 'use-reducer-async';
import Types from './types';

export const asyncActionHandlers: AsyncActionHandlers<
  Reducer<State, Action>,
  AsyncAction
> = {
  // todo: add init and home here
  [Types.SET_AXES]:
    ({ dispatch }) =>
    async (action) => {
      // step 0: update axes in state
      dispatch({
        type: Types.INNER_SET_STATE_AXES,
        payload: { axes: action.payload.axes },
      });
      // step 1: take the 6dof array and calculate gcode from that
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
