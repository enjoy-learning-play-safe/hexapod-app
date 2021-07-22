/* Static config for state */

import * as tf from '@tensorflow/tfjs';
import { Tensor2D } from '@tensorflow/tfjs';
import { toRadians } from '_/renderer/formulae/toRadians';

export const constants = {
  baseRadius: 125,
  platformRadius: 75,
  fixedRodsLength: 210,
  actuatorMin: 0,
  actuatorMax: 300,
  actuatorHome: 150, // (max - min) / 2
  maxChangePerSlice: 1,
  minimumSlicePerMovement: 10,
};

export const previousInput = tf.tensor1d([
  0,
  0,
  0,
  toRadians(0),
  toRadians(0),
  toRadians(0),
]);

export const platformAngles = tf.tensor1d([
  0,
  Math.PI / 3,
  (2 * Math.PI) / 3,
  Math.PI,
  (4 * Math.PI) / 3,
  (5 * Math.PI) / 3,
]);

const platformCoordsXY = tf.stack([
  platformAngles.cos().mul(constants.platformRadius),
  platformAngles.sin().mul(constants.platformRadius),
]) as Tensor2D;

export const platformCoordsBasis = tf.stack([
  ...tf.unstack(platformCoordsXY),
  tf.zeros([6]),
]) as Tensor2D;

const b_leg2x = platformCoordsXY.arraySync()[0][1];
const b_leg3x = platformCoordsXY.arraySync()[0][2];
const b_leg23y = (constants.baseRadius ** 2 - b_leg2x ** 2) ** 0.5;
const l2a = Math.atan2(b_leg23y, b_leg2x);
const l3a = Math.atan2(b_leg23y, b_leg3x);

export const baseAngles = tf.tensor1d([
  l3a + (4 * Math.PI) / 3,
  l2a,
  l3a,
  l2a + (2 * Math.PI) / 3,
  l3a + (2 * Math.PI) / 3,
  l2a + (4 * Math.PI) / 3,
]);

export const baseCoords = tf.stack([
  tf.cos(baseAngles).mul(constants.baseRadius),
  tf.sin(baseAngles).mul(constants.baseRadius),
]) as Tensor2D;

export const homeHeight =
  Math.abs(
    constants.fixedRodsLength ** 2 -
      (baseCoords.arraySync()[0][0] - platformCoordsXY.arraySync()[0][0]) ** 2 -
      (baseCoords.arraySync()[1][0] - platformCoordsXY.arraySync()[1][0]) ** 2
  ) **
    0.5 +
  constants.actuatorHome;

export const platformCoordsHome = tf.stack([
  ...tf.unstack(platformCoordsXY),
  tf.ones([6]).mul(homeHeight),
]) as Tensor2D;
