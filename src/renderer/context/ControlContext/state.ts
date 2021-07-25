import {
  baseCoords,
  platformAngles,
  platformCoordsBasis,
  platformCoordsHome,
  previousInput,
} from './constants';
import { Tensor1D, Tensor2D } from '@tensorflow/tfjs';

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

type Config = {
  base: {
    radius: number;
    coords: Tensor2D;
  };
  platform: {
    radius: number;
    homeCoords: Tensor2D;
    coordsBasis: Tensor2D;
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

type Calculated = {
  previousInput: Tensor1D;
  platform: {
    angles: Tensor1D;
    coords: Tensor2D;
  };
};

export type State = {
  axes: Axes;
  liveInput: boolean;
  dof: number;
  config: Config;
  calculated: Calculated; // todo change type
};

const initialConfig: Config = {
  base: {
    radius: 123.7,
    coords: baseCoords, // ! DO NOT EDIT DIRECTLY - calculated from base.radius
  },
  platform: {
    radius: 75,
    homeCoords: platformCoordsHome,
    coordsBasis: platformCoordsBasis,
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
  delayDuration: 120,
};

const initialAxes: Axes = {
  x: {
    name: 'X',
    current: initialConfig.default.x,
    default: initialConfig.default.x,
    min: -initialConfig.range.x,
    max: initialConfig.range.x,
    loading: false,
  },
  y: {
    name: 'Y',
    current: initialConfig.default.y,
    default: initialConfig.default.y,
    min: -initialConfig.range.y,
    max: initialConfig.range.y,
    loading: false,
  },
  z: {
    name: 'Z',
    current: initialConfig.default.z,
    default: initialConfig.default.z,
    min: -initialConfig.range.z,
    max: initialConfig.range.z,
    loading: false,
  },
  roll: {
    name: 'Roll',
    current: initialConfig.default.roll,
    default: initialConfig.default.roll,
    min: -initialConfig.range.roll,
    max: initialConfig.range.roll,
    loading: false,
  },
  pitch: {
    name: 'Pitch',
    current: initialConfig.default.pitch,
    default: initialConfig.default.pitch,
    min: -initialConfig.range.pitch,
    max: initialConfig.range.pitch,
    loading: false,
  },
  yaw: {
    name: 'Yaw',
    current: initialConfig.default.yaw,
    default: initialConfig.default.yaw,
    min: -initialConfig.range.yaw,
    max: initialConfig.range.yaw,
    loading: false,
  },
};

const initialCalculated: Calculated = {
  previousInput: previousInput,
  platform: {
    angles: platformAngles,
    coords: platformCoordsHome,
  },
};

export const initialState: State = {
  axes: initialAxes,
  liveInput: false,
  dof: 6,
  config: initialConfig,
  calculated: initialCalculated,
};
