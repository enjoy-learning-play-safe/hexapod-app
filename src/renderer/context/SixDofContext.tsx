/*
 * p_coor [3*6]
 * p_origin_pbasis [3*1]
 * p_coor_pbasis [3*6]
 * b_coor [3*6]
 * b_origin_pbasis
 *
 */

import { createContext, Reducer } from 'react';

export enum Types {
  UPDATE_AXIS = 'UPDATE_AXIS',
  RESET_AXES = 'RESET_AXES',
  SET_LIVE_INPUT = 'SET_LIVE_INPUT',
}

export enum Axis {
  x = 'x',
  y = 'y',
  z = 'z',
  roll = 'roll',
  pitch = 'pitch',
  yaw = 'yaw',
}

export type AxisData = {
  name: string;
  current: number;
  default: number;
  min: number;
  max: number;
};

export type State = {
  axes: {
    [Axis.x]: AxisData;
    [Axis.y]: AxisData;
    [Axis.z]: AxisData;
    [Axis.roll]: AxisData;
    [Axis.pitch]: AxisData;
    [Axis.yaw]: AxisData;
  };
  liveInput: boolean;
  dof: number;
};

export const initialState: State = {
  axes: {
    x: {
      name: 'X',
      current: 0,
      default: 0,
      min: -100,
      max: 100,
    },
    y: {
      name: 'Y',
      current: 0,
      default: 0,
      min: -100,
      max: 100,
    },
    z: {
      name: 'Z',
      current: 0,
      default: 0,
      min: -100,
      max: 100,
    },
    roll: {
      name: 'Roll',
      current: 0,
      default: 0,
      min: -100,
      max: 100,
    },
    pitch: {
      name: 'Pitch',
      current: 0,
      default: 0,
      min: -100,
      max: 100,
    },
    yaw: {
      name: 'Yaw',
      current: 0,
      default: 0,
      min: -100,
      max: 100,
    },
  },
  liveInput: false,
  dof: 6,
};

export type Action =
  | {
      type: Types.UPDATE_AXIS;
      axis: Axis;
      value: number;
    }
  | {
      type: Types.RESET_AXES;
    }
  | {
      type: Types.SET_LIVE_INPUT;
      liveInput: boolean;
    };

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case Types.UPDATE_AXIS:
      return {
        ...state,
        axes: {
          ...state.axes,
          [action.axis]: {
            ...state.axes[action.axis],
            current: action.value,
          },
        },
      };
    case Types.RESET_AXES:
      return { ...state, axes: initialState.axes };
    case Types.SET_LIVE_INPUT:
      return { ...state, liveInput: action.liveInput };
    default:
      return state;
  }
};

export type ContextValue = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export const Context = createContext<ContextValue>({
  state: initialState,
  dispatch: () => {},
});
