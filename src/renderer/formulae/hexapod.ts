import * as tf from '@tensorflow/tfjs';

// * globals
const baseRadius = 123.7;
const platformRadius = 75;
const fixedRods = 210;
// ....

// * init
export const previousInput = tf.zeros([6]);

export const platformAngles = tf.tensor1d([
  0,
  Math.PI / 3,
  (2 * Math.PI) / 3,
  Math.PI,
  (4 * Math.PI) / 3,
  (5 * Math.PI) / 3,
]);

// platformAngles.sin().mul(tf.scalar(5)).arraySync(),

export const pCoorXY = tf.tensor2d(
  [
    platformAngles.cos().arraySync() as number[],
    platformAngles.sin().mul(tf.scalar(5)).arraySync() as number[],
  ],
  [2, 6]
);

export const pCoorPbasis: tf.Tensor2D = pCoorXY.concat(tf.zeros([1, 6]));

export const generateBCoor = (pCoorXY: tf.Tensor2D) => {
  const b_leg2x = pCoorXY.gather(0).gather(1).dataSync()[0];
  const b_leg3x = pCoorXY.gather(0).gather(2).dataSync()[0];

  // return { b_leg2x, b_leg3x };

  const b_leg23y = (baseRadius ** 2 - b_leg2x ** 2) ** 0.5;

  const l2a = tf.atan2(b_leg23y, b_leg2x).dataSync()[0];
  const l3a = tf.atan2(b_leg23y, b_leg3x).dataSync()[0];

  // return { l2a, l3a };

  const bAngles = tf.tensor1d([
    l3a + (4 * Math.PI) / 3,
    l2a,
    l3a,
    l2a + (2 * Math.PI) / 3,
    l3a + (2 * Math.PI) / 3,
    l2a + (4 * Math.PI) / 3,
  ]);

  const bCoor = tf.tensor2d(
    [
      bAngles.cos().mul(baseRadius).arraySync() as number[],
      bAngles.sin().mul(baseRadius).arraySync() as number[],
    ],
    [2, 6]
  );

  return bCoor.arraySync();
};

export const matMulTensor = tf
  .tensor2d([
    [1, 2],
    [3, 4],
  ])
  .matMul(
    tf.tensor2d([
      [2, 2],
      [2, 2],
    ])
  );

// * main loop

// * functions

export const actuatorSolving = (pCoor: tf.Tensor2D, bCoor: tf.Tensor2D) => {
  const zTensor = pCoor.gather(2).arraySync();
  return zTensor.map((item, index) => {
    return (
      pCoor.gather([2]).gather([index]).arraySync()[0][0] -
      Math.abs(
        fixedRods ** 2 -
          (pCoor.gather([0]).gather([index]).arraySync()[0][0] -
            bCoor.gather([0]).gather([index]).arraySync()[0][0]) **
            2 -
          (pCoor.gather([1]).gather([index]).arraySync()[0][0] -
            bCoor.gather([1]).gather([index]).arraySync()[0][0]) **
            2
      ) **
        0.5
    );
  });
};

// tf.math.multiply(x, y, (name = None));
