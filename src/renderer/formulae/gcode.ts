import * as tf from '@tensorflow/tfjs';
import { Tensor2D, Tensor1D } from '@tensorflow/tfjs';
import { interpolate } from './interpolate';

import { rotationSimple } from './rotationSimple';
import { slicingNumberGenerator } from './slicingNumberGenerator';
import { NewAxes } from './types';

export const gcode = (
  platformCoords: Tensor2D,
  newAxes: NewAxes,
  previousInput: Tensor1D,
  platformCoordsBasis: Tensor2D,
  platformCoordsHome: Tensor2D,
  fixedRodsLength: number,
  baseCoords: Tensor2D,
  maxChangePerSlice: number,
  minSlicePerMovement: number,
  precision?: number
) => {
  const startPose = platformCoords;

  const { x, y, z, roll, pitch, yaw } = newAxes;

  const rotation = tf.matMul(
    rotationSimple(roll, pitch, yaw),
    platformCoordsBasis
  );

  const rotationArray = rotation.arraySync();

  const newPlatformCoords = tf
    .stack([
      rotation.gather(0).add(x),
      rotation.gather(1).add(y),
      rotation.gather(2).add(z),
    ])
    .sub(platformCoordsBasis)
    .add(platformCoordsHome) as Tensor2D;

  const newPlatformCoordsArray = newPlatformCoords.arraySync();

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
  const interpolated = interpolate(
    newAxes,
    previousInput,
    slicingNumber,
    platformCoordsBasis,
    platformCoordsHome,
    fixedRodsLength,
    baseCoords
  );

  const { finalValue } = interpolated;

  // todo: write final position via serial (is this necessary though?)

  return { newPlatformCoords, gcodeString: finalValue?.gcodeString };
};
