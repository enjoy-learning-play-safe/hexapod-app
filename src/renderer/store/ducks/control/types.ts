import { Tensor1D, Tensor2D } from '@tensorflow/tfjs';

// * Action Types
export enum ActionTypes {
  //
  SET_APPLY_OPTIONS = '@control/SET_APPLY_OPTIONS',

  // sagas
  APPLY_OPTIONS = '@control/APPLY_OPTIONS',
}

export type ReducerAction = {
  type: ActionTypes.SET_APPLY_OPTIONS;
  config: Config;
  calculated: Calculated;
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
    angles: number[];
    coords: number[][];
  };
};

export type State = {
  axes: Axes;
  liveInput: boolean;
  options: Options; // user defined settings
  config: Config; // based on options
  calculated: Calculated; //  final calculated output
};
