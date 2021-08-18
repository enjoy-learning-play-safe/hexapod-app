import { setCalculated } from './actions';
import calcFromOptions from '_/renderer/formulae/calcFromOptions';

import {
  State,
  Axes,
  Options,
  Config,
  Calculated,
  Micro,
  ActionTypes,
  ReducerAction,
  SetApplyOptionsAction,
  SetUpdateAxesAction,
  SetCalculatedAction,
  SetLiveInputAction,
  SetM114Action,
  SetPlannerBufferAction,
  SetSlicedArrayAction,
  AppendSlicedArray,
} from './types';

// * sane defaults

export const initialOptions: Options = {
  base: {
    radius: 125,
  },
  platform: {
    radius: 75,
  },
  actuator: {
    min: 0,
    max: 240,
    home: 120,
    precision: 3,
  },
  fixedRods: {
    len: 220,
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
    z: 120,
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

const initialMicro: Micro = {
  m114: 'X0.00 Y0.00 Z0.00 A0.00 B0.00 C0.00',
  plannerBuffer: 'P64 B4',
  sliced: [],
};

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
  micro: initialMicro,
};

const reducer = (state = initialState, action: ReducerAction) => {
  switch (action.type) {
    case ActionTypes.SET_APPLY_OPTIONS:
      return reducerSetApplyOptions(state, action);
    case ActionTypes.SET_UPDATE_AXES:
      return reducerSetUpdateAxes(state, action);
    case ActionTypes.SET_CALCULATED:
      return reducerSetCalculated(state, action);
    case ActionTypes.SET_LIVE_INPUT:
      return reducerSetLiveInput(state, action);
    case ActionTypes.SET_M114:
      return reducerSetM114(state, action);
    case ActionTypes.SET_PLANNER_BUFFER:
      return reducerSetPlannerBuffer(state, action);
    case ActionTypes.SET_SLICED_ARRAY:
      return reducerSetSlicedArray(state, action);
    case ActionTypes.APPEND_SLICED_ARRAY:
      return reducerAppendSlicedArray(state, action);
    default:
      return state;
  }
};

export default reducer;

const reducerSetApplyOptions = (
  state: State,
  action: SetApplyOptionsAction
) => {
  const { options, config, calculated, axes } = action;
  return { ...state, options, config, calculated, axes };
};

const reducerSetUpdateAxes = (state: State, action: SetUpdateAxesAction) => {
  const { axes } = action;
  return {
    ...state,
    axes,
  };
};

const reducerSetCalculated = (state: State, action: SetCalculatedAction) => {
  const { calculated } = action;
  return { ...state, calculated };
};

const reducerSetLiveInput = (state: State, action: SetLiveInputAction) => {
  const newBool = action.liveInput;

  return { ...state, liveInput: newBool || !state.liveInput };
};

const reducerSetM114 = (state: State, action: SetM114Action) => {
  return {
    ...state,
    micro: {
      ...state.micro,
      m114: action.m114Response,
    },
  };
};

const reducerSetPlannerBuffer = (
  state: State,
  action: SetPlannerBufferAction
) => {
  return {
    ...state,
    micro: {
      ...state.micro,
      plannerBuffer: action.pb,
    },
  };
};

const reducerSetSlicedArray = (state: State, action: SetSlicedArrayAction) => {
  return {
    ...state,
    micro: {
      ...state.micro,
      sliced: action.slicedArray,
    },
  };
};

const reducerAppendSlicedArray = (state: State, action: AppendSlicedArray) => {
  return {
    ...state,
    micro: {
      ...state.micro,
      sliced: [...state.micro.sliced, action.slice],
    },
  };
};
