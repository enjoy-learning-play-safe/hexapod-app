import calcFromOptions from '_/renderer/formulae/calcFromOptions';

import {
  State,
  Axes,
  Options,
  Config,
  Calculated,
  ActionTypes,
  ReducerAction,
} from './types';

// * sane defaults

export const initialOptions: Options = {
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
    count: 6,
  },
  slice: {
    maxChangePerSlice: 1,
    minSlicePerMovement: 10,
  },
  default: {
    x: 0,
    y: 0,
    z: 0,
    roll: 0,
    pitch: 0,
    yaw: 0,
  },
  range: {
    x: 100,
    y: 100,
    z: 150,
    roll: 30, // 0.524 radians
    pitch: 30,
    yaw: 30,
  },
  delayDuration: 0,
};

const initialAxes: Axes = {
  x: {
    name: 'X',
    current: initialOptions.default.x,
    default: initialOptions.default.x,
    min: -initialOptions.range.x,
    max: initialOptions.range.x,
    loading: false,
  },
  y: {
    name: 'Y',
    current: initialOptions.default.y,
    default: initialOptions.default.y,
    min: -initialOptions.range.y,
    max: initialOptions.range.y,
    loading: false,
  },
  z: {
    name: 'Z',
    current: initialOptions.default.z,
    default: initialOptions.default.z,
    min: -initialOptions.range.z,
    max: initialOptions.range.z,
    loading: false,
  },
  roll: {
    name: 'Roll',
    current: initialOptions.default.roll,
    default: initialOptions.default.roll,
    min: -initialOptions.range.roll,
    max: initialOptions.range.roll,
    loading: false,
  },
  pitch: {
    name: 'Pitch',
    current: initialOptions.default.pitch,
    default: initialOptions.default.pitch,
    min: -initialOptions.range.pitch,
    max: initialOptions.range.pitch,
    loading: false,
  },
  yaw: {
    name: 'Yaw',
    current: initialOptions.default.yaw,
    default: initialOptions.default.yaw,
    min: -initialOptions.range.yaw,
    max: initialOptions.range.yaw,
    loading: false,
  },
};

// const initialConfig: Config = {
//   base: {
//     coords: tf.zeros([2, 6]),
//   },
//   platform: {
//     homeCoords: tf.zeros([3, 6]),
//     coordsBasis: tf.zeros([3, 6]),
//   },
// };

// const initialCalculated: Calculated = {
//   previousInput: tf.zeros([6]),
//   platform: {
//     angles: tf.zeros([6]),
//     coords: tf.zeros([3, 6]),
//   },
// };

const {
  config: initialConfig,
  calculated: initialCalculated,
  axes: newInitialAxes,
} = calcFromOptions(initialOptions, initialAxes);

export const initialState: State = {
  axes: newInitialAxes,
  liveInput: false,
  options: initialOptions,
  config: initialConfig,
  calculated: initialCalculated,
};

const reducer = (state = initialState, action: ReducerAction) => {
  switch (action.type) {
    case ActionTypes.SET_APPLY_OPTIONS:
      const { options, config, calculated } = action;
      return { ...state, options, config, calculated };
    default:
      return state;
  }
};

export default reducer;
