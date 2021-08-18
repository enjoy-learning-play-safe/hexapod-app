// * Action Types
export enum ActionTypes {
  //
  SET_APPLY_OPTIONS = '@control/SET_APPLY_OPTIONS',
  SET_UPDATE_AXES = '@control/SET_UPDATE_AXES',
  SET_CALCULATED = '@control/SET_CALCULATED',
  SET_LIVE_INPUT = '@control/SET_LIVE_INPUT',

  // sagas
  APPLY_OPTIONS = '@control/APPLY_OPTIONS',
  UPDATE_AXES = '@control/UPDATE_AXES',
  WRITE_TO_ARDUINO = '@control/WRITE_TO_ARDUINO',
  SET_M114 = '@control/SET_M114',
  SET_PLANNER_BUFFER = '@control/SET_PLANNER_BUFFER',
  SET_SLICED_ARRAY = '@control/SET_SLICED_ARRAY',
  APPEND_SLICED_ARRAY = '@control/APPEND_SLICED_ARRAY',
}

export type ReducerAction =
  | SetApplyOptionsAction
  | SetUpdateAxesAction
  | SetCalculatedAction
  | SetLiveInputAction
  | SetM114Action
  | SetPlannerBufferAction
  | SetSlicedArrayAction
  | AppendSlicedArray;

export type SetApplyOptionsAction = {
  type: ActionTypes.SET_APPLY_OPTIONS;
  options: Options;
  config: Config;
  calculated: Calculated;
  axes: Axes;
};

export type SetUpdateAxesAction = {
  type: ActionTypes.SET_UPDATE_AXES;
  axes: Axes;
};

export type SetCalculatedAction = {
  type: ActionTypes.SET_CALCULATED;
  calculated: Calculated;
};

export type SetLiveInputAction = {
  type: ActionTypes.SET_LIVE_INPUT;
  liveInput?: boolean;
};

export type SetM114Action = {
  type: ActionTypes.SET_M114;
  m114Response: string;
};

export type SetPlannerBufferAction = {
  type: ActionTypes.SET_PLANNER_BUFFER;
  pb: string;
};

export type SetSlicedArrayAction = {
  type: ActionTypes.SET_SLICED_ARRAY;
  slicedArray: number[];
};

export type AppendSlicedArray = {
  type: ActionTypes.APPEND_SLICED_ARRAY;
  slice: number[];
};

// * State Types

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
  loading: boolean;
};

export type Axes = {
  [Axis.x]: AxisData;
  [Axis.y]: AxisData;
  [Axis.z]: AxisData;
  [Axis.roll]: AxisData;
  [Axis.pitch]: AxisData;
  [Axis.yaw]: AxisData;
};

export type AxesOptional = {
  [Axis.x]?: AxisData;
  [Axis.y]?: AxisData;
  [Axis.z]?: AxisData;
  [Axis.roll]?: AxisData;
  [Axis.pitch]?: AxisData;
  [Axis.yaw]?: AxisData;
};

export type AxesNumber = {
  [Axis.x]: number;
  [Axis.y]: number;
  [Axis.z]: number;
  [Axis.roll]: number;
  [Axis.pitch]: number;
  [Axis.yaw]: number;
};

export type AxesNumberOptional = {
  [Axis.x]?: number;
  [Axis.y]?: number;
  [Axis.z]?: number;
  [Axis.roll]?: number;
  [Axis.pitch]?: number;
  [Axis.yaw]?: number;
};

export type Options = {
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
  default: AxesNumber;
  range: {
    x: number;
    y: number;
    z: number;
    roll: number;
    pitch: number;
    yaw: number;
  };
  delayDuration: number;
};

export type Config = {
  base: {
    coords: number[][];
  };
  platform: {
    homeCoords: number[][];
    coordsBasis: number[][];
  };
};

export type Calculated = {
  previousInput: number[];
  platform: {
    angles: number[]; // todo: make this constant
    coords: number[][];
  };
};

export type Micro = {
  m114: string;
  plannerBuffer: string;
  sliced: { [k: string]: number }[];
};

export type State = {
  axes: Axes;
  liveInput: boolean;
  options: Options; // user defined settings
  config: Config; // based on options
  calculated: Calculated; //  final calculated output
  micro: Micro; // response from microcontroller
};
