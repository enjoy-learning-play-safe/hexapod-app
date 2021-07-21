import * as tf from '@tensorflow/tfjs';
import { Tensor2D, Tensor1D } from '@tensorflow/tfjs';
import { interpolate } from './interpolate';

import { rotationSimple } from './rotationSimple';
import { NewAxes } from './types';

export const gcode = (
  platformCoords: Tensor2D,
  newAxes: NewAxes,
  previousInput: Tensor1D,
  platformCoordsBasis: Tensor2D,
  platformCoordsHome: Tensor2D,
  fixedRodsLength: number,
  baseCoords: Tensor2D,
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
    .add(platformCoordsHome) as Tensor1D;

  const newPlatformCoordsArray = newPlatformCoords.arraySync();

  const endPose = newPlatformCoords;

  // const slicingNumber = slicingNumberGenerator(startPose, endPose); //todo
  const slicingNumber = 2;

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

  // todo: write final position via serial (is this necessary though?)

  return newPlatformCoords;
};
