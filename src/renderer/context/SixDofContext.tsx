/*
 * p_coor [3*6]
 * p_origin_pbasis [3*1]
 * p_coor_pbasis [3*6]
 * b_coor [3*6]
 * b_origin_pbasis
 *
 */

import { createContext, Reducer } from 'react';
import tf, { Tensor, Rank } from '@tensorflow/tfjs';

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
  config: Config;
  calculated: Calculated;
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
  config: {
    base: {
      radius: 123.7,
    },
    platform: {
      radius: 75,
    },
    actuator: {
      min: 0,
      max: 300,
      home: 150,
      precision: 3,
    },
    fixedRods: {
      len: 210,
      count: 6, // num legs
    },
    slice: {
      maxChangePerSlice: 1,
      minSlicePerMovement: 10,
    },
    range: {
      xTranslate: 100,
      yTranslate: 100,
      zTranslate: 150,
      roll: 0.524,
      pitch: 0.524,
      yaw: 0.524,
    },
  },
  calculated: {
    axes: {
      xTranslate: 0,
      yTranslate: 0,
      zTranslate: 0,
      roll: 0,
      pitch: 0,
      yaw: 0,
    },
    previousInputs: tf.zeros([6]),
    platform: {
      angles: tf.tensor([
        [
          0,
          Math.PI / 3,
          (2 * Math.PI) / 3,
          Math.PI,
          (4 * Math.PI) / 3,
          (5 * Math.PI) / 3,
        ],
      ]),
      coorXy: tf.tensor([0, 0]),
    },
  },
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

//
// Calculated
//

export type Config = {
  base: {
    radius: number;
  };
  platform: {
    radius: number;
  };
  actuator: {
    min: number;
    max: number;
    home: number;
    precision: number;
  };
  fixedRods: {
    len: number;
    count: number;
  };
  slice: {
    maxChangePerSlice: number;
    minSlicePerMovement: number;
  };
  range: {
    xTranslate: number;
    yTranslate: number;
    zTranslate: number;
    roll: number;
    pitch: number;
    yaw: number;
  };
};

export type Calculated = {
  axes: {
    xTranslate: number;
    yTranslate: number;
    zTranslate: number;
    roll: number;
    pitch: number;
    yaw: number;
  };
  previousInputs: Tensor<Rank>;
  platform: {
    angles: Tensor<Rank>;
    coorXy: Tensor<Rank>;
  };
};
