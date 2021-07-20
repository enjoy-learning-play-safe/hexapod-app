import { Axis } from './../context/ControlContext/state';
// This file declares types for hexapod calcualation types

export type NewAxes = {
  [Axis.x]: number;
  [Axis.y]: number;
  [Axis.z]: number;
  [Axis.roll]: number;
  [Axis.pitch]: number;
  [Axis.yaw]: number;
};
