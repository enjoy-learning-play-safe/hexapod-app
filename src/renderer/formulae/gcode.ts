import * as tf from '@tensorflow/tfjs';
import { Tensor2D, Tensor1D } from '@tensorflow/tfjs';
import { interpolate } from './interpolate';

import { rotationSimple } from './rotationSimple';
import { slicingNumberGenerator } from './slicingNumberGenerator';
import { NewAxes } from './types';

export const gcode = async (
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

  const newPlatformCoords = tf
    .stack([
      rotation.gather(0).add(x),
      rotation.gather(1).add(y),
      rotation.gather(2).add(z),
    ])
    .sub(platformCoordsBasis)
    .add(platformCoordsHome) as Tensor2D;

  const endPose = newPlatformCoords;

  const slicingNumber = await slicingNumberGenerator(
    startPose,
    endPose,
    fixedRodsLength,
    baseCoords,
    maxChangePerSlice,
    minSlicePerMovement
  );

  // todo: call interpolate() here
  const interpolated = await interpolate(
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

  //

  const newPreviousInput = tf.tensor1d(Object.values(newAxes));

  console.log('newPreviousInput', newPreviousInput);

  const newPlatformCoordsBasis = platformCoordsBasis; // ! change this

  return {
    platformCoords: newPlatformCoords,
    previousInput: newPreviousInput,
    platformCoordsBasis: newPlatformCoordsBasis,
    gcodeString: finalValue?.gcodeString,
  };
};
