import { Axis } from '../context/ControlContext/state';


type AxesNumber = {
  [Axis.x]: number;
  [Axis.y]: number;
  [Axis.z]: number;
  [Axis.roll]: number;
  [Axis.pitch]: number;
  [Axis.yaw]: number;
};

type AxesXyzNumber = {
  [Axis.x]: number;
  [Axis.y]: number;
  [Axis.z]: number;
}

type platformCoords = {
  1: AxesXyzNumber,
  2: AxesXyzNumber,
  3: AxesXyzNumber,
  4: AxesXyzNumber,
  5: AxesXyzNumber,
  6: AxesXyzNumber
}

const gcode = (pCoor: platformCoords, transRot: AxesNumber, previousInputs: AxesNumber) => {

  const startpose = pCoor
  const rott = 

}