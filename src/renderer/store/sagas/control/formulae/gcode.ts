import { AxesNumber } from './../../../ducks/control/types';
import serial from '../../../../utils/serialport';

import { interpolate } from './interpolate';
import { rotationSimple } from './rotationSimple';
import { slicingNumberGenerator } from './slicingNumberGenerator';
import { toRadians } from './toRadians';
import matMul from './matMul';

export const gcode = async (
  platformCoords: number[][],
  newAxes: AxesNumber,
  previousInput: number[],
  platformCoordsBasis: number[][],
  platformCoordsHome: number[][],
  fixedRodsLength: number,
  baseCoords: number[][],
  maxChangePerSlice: number,
  minSlicePerMovement: number,
  delayDuration: number,
  precision?: number
) => {
  console.log('gcodeArgs', {
    platformCoords: platformCoords,
  });

  const startPose = platformCoords;

  console.log('startPoseArray', startPose);

  const { x, y, z } = newAxes;

  const roll = toRadians(newAxes.roll);
  const pitch = toRadians(newAxes.pitch);
  const yaw = toRadians(newAxes.yaw);

  const newAxesRadians: AxesNumber = {
    x,
    y,
    z,
    roll,
    pitch,
    yaw,
  };

  const rotation = matMul(
    rotationSimple(roll, pitch, yaw),
    platformCoordsBasis
  );

  const newPlatformCoords = [
    rotation[0].map((element) => element + x),
    rotation[1].map((element) => element + y),
    rotation[2].map((element) => element + z),
  ].map((row, rowIndex) =>
    row.map(
      (element, columnIndex) =>
        element -
        platformCoordsBasis[rowIndex][columnIndex] +
        platformCoordsHome[rowIndex][columnIndex]
    )
  );

  const endPose = newPlatformCoords;

  const slicingNumber = slicingNumberGenerator(
    startPose,
    endPose,
    fixedRodsLength,
    baseCoords,
    maxChangePerSlice,
    minSlicePerMovement
  );

  // todo: call interpolate() here
  const interpolated = await interpolate(
    newAxesRadians,
    previousInput,
    slicingNumber,
    platformCoordsBasis,
    platformCoordsHome,
    fixedRodsLength,
    baseCoords,
    delayDuration
  );

  const { finalValue } = interpolated;
  const { gcodeString } = finalValue ?? {};

  const newPreviousInput = Object.values(newAxesRadians);

  console.log('newPreviousInput', newPreviousInput);

  const newPlatformCoordsBasis = platformCoordsBasis; // ! change this

  // todo: write final position via serial (is this necessary though?)

  await serial.write(gcodeString ?? ''); // ? is this duped?

  return {
    platformCoords: newPlatformCoords,
    previousInput: newPreviousInput,
    platformCoordsBasis: newPlatformCoordsBasis,
    gcodeString: gcodeString,
  };
};
