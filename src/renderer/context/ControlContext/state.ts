import {
  baseCoords,
  platformAngles,
  platformCoordsBasis,
  platformCoordsHome,
  previousInput,
} from './constants';
import * as tf from '@tensorflow/tfjs';
import { Rank, Tensor, Tensor1D, Tensor2D } from '@tensorflow/tfjs';

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
  delayDuration: number;
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
  previousInput: Tensor1D;
  platform: {
    angles: Tensor1D;
    coords: Tensor2D;
    coordsBasis: Tensor2D;
  };
  slicingNumber: number;
};

export type State = {
  axes: Axes;
  liveInput: boolean;
  dof: number;
  config: Config;
  calculated: Calculated; // todo change type
};

const initialAxes: Axes = {
  x: {
    name: 'X',
    current: 0,
    default: 0,
    min: -100,
    max: 100,
    loading: false,
  },
  y: {
    name: 'Y',
    current: 0,
    default: 0,
    min: -100,
    max: 100,
    loading: false,
  },
  z: {
    name: 'Z',
    current: 0,
    default: 0,
    min: -100,
    max: 100,
    loading: false,
  },
  roll: {
    name: 'Roll',
    current: 0,
    default: 0,
    min: -100,
    max: 100,
    loading: false,
  },
  pitch: {
    name: 'Pitch',
    current: 0,
    default: 0,
    min: -100,
    max: 100,
    loading: false,
  },
  yaw: {
    name: 'Yaw',
    current: 0,
    default: 0,
    min: -100,
    max: 100,
    loading: false,
  },
};

const initialConfig: Config = {
  base: {
    radius: 123.7,
    coords: baseCoords,
  },
  platform: {
    radius: 75,
    homeCoords: platformCoordsHome,
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
  range: {
    xTranslate: 100,
    yTranslate: 100,
    zTranslate: 150,
    roll: 0.524,
    pitch: 0.524,
    yaw: 0.524,
  },
  delayDuration: 120,
};

const initialCalculated: Calculated = {
  axes: {
    xTranslate: 0,
    yTranslate: 0,
    zTranslate: 0,
    roll: 0,
    pitch: 0,
    yaw: 0,
  },
  previousInput: previousInput,
  platform: {
    angles: platformAngles,
    coords: platformCoordsHome,
    coordsBasis: platformCoordsBasis,
  },
  slicingNumber: 0,
};

export const initialState: State = {
  axes: initialAxes,
  liveInput: false,
  dof: 6,
  config: initialConfig,
  calculated: initialCalculated,
};
