import { Rank, Tensor } from '@tensorflow/tfjs';

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

type Axes = {
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

type Config = {
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

type Calculated = {
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
    coorXY: Tensor<Rank>;
    angles: Tensor<Rank>;
  };
  slicingNumber: number;
};

export type State = {
  axes: Axes;
  liveInput: boolean;
  dof: number;
  config: {}; // todo change type
  calculated: {}; // todo change type
};

const initialAxes: Axes = {
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
};

const initialConfig = {
  // todo
};

const initialCalculated = {
  // todo
};

export const initialState: State = {
  axes: initialAxes,
  liveInput: false,
  dof: 6,
  config: initialConfig,
  calculated: initialCalculated,
};
