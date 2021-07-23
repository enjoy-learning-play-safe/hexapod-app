import * as tf from '@tensorflow/tfjs';
import { Tensor2D } from '@tensorflow/tfjs';

import { toRadians } from './../formulae/toRadians';

export const constants = {
  baseRadius: 125,
  platformRadius: 75,
  fixedRodsLength: 210,
  actuatorMin: 0,
  actuatorMax: 300,
  actuatorHome: 150, // (max - min) / 2
  maxChangePerSlice: 1,
  minimumSlicePerMovement: 10,
  delayDuration: 120,
};

export const platformAnglesTestData = tf.tensor1d([
  0,
  Math.PI / 3,
  (2 * Math.PI) / 3,
  Math.PI,
  (4 * Math.PI) / 3,
  (5 * Math.PI) / 3,
]);

export const newAxesTestData = {
  x: 0,
  y: 0,
  z: 10,
  roll: toRadians(0),
  pitch: toRadians(0),
  yaw: toRadians(0),
};

export const newAxesTestData30 = {
  x: 30,
  y: 30,
  z: 30,
  roll: toRadians(30),
  pitch: toRadians(30),
  yaw: toRadians(30),
};

export const previousInputTestData = tf.tensor1d([
  0,
  0,
  0,
  toRadians(0),
  toRadians(0),
  toRadians(0),
]);

export const platformCoordsXYTestData = tf.stack([
  platformAnglesTestData.cos().mul(constants.platformRadius),
  platformAnglesTestData.sin().mul(constants.platformRadius),
]) as Tensor2D;

export const platformCoordsBasisTestData = tf.stack([
  ...tf.unstack(platformCoordsXYTestData),
  tf.zeros([6]),
]) as Tensor2D;

``;
export const b_leg2xTestData = platformCoordsXYTestData.arraySync()[0][1];
export const b_leg3xTestData = platformCoordsXYTestData.arraySync()[0][2];
export const b_leg23yTestData =
  (constants.baseRadius ** 2 - b_leg2xTestData ** 2) ** 0.5;

export const l2aTestData = Math.atan2(b_leg23yTestData, b_leg2xTestData);
export const l3aTestData = Math.atan2(b_leg23yTestData, b_leg3xTestData);

export const baseAnglesTestData = tf.tensor1d([
  l3aTestData + (4 * Math.PI) / 3,
  l2aTestData,
  l3aTestData,
  l2aTestData + (2 * Math.PI) / 3,
  l3aTestData + (2 * Math.PI) / 3,
  l2aTestData + (4 * Math.PI) / 3,
]);

export const baseCoordsTestData = tf.stack([
  tf.cos(baseAnglesTestData).mul(constants.baseRadius),
  tf.sin(baseAnglesTestData).mul(constants.baseRadius),
]) as Tensor2D;

export const homeHeightTestData =
  Math.abs(
    constants.fixedRodsLength ** 2 -
      (baseCoordsTestData.arraySync()[0][0] -
        platformCoordsXYTestData.arraySync()[0][0]) **
        2 -
      (baseCoordsTestData.arraySync()[1][0] -
        platformCoordsXYTestData.arraySync()[1][0]) **
        2
  ) **
    0.5 +
  constants.actuatorHome;

export const platformCoordsHomeTestData = tf.stack([
  ...tf.unstack(platformCoordsXYTestData),
  tf.ones([6]).mul(homeHeightTestData),
]) as Tensor2D;

export const platformCoordsTestData = tf.stack([
  // translate upward by 10 units
  ...tf.unstack(platformCoordsXYTestData),
  tf.ones([6]).mul(homeHeightTestData).add(10),
]) as Tensor2D;
