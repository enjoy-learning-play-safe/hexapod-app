import * as tf from '@tensorflow/tfjs';

const constants = {
  platformRadius: 75,
};

export const platformAngles = tf.tensor1d([
  0,
  Math.PI / 3,
  (2 * Math.PI) / 3,
  Math.PI,
  (4 * Math.PI) / 3,
  (5 * Math.PI) / 3,
]);

// const platformCoords = tf.tensor2d([
//   [
//     platformAngles.cos(),
//     platformAngles.sin(),
//   ],
// ]);

// export const pCoor_starting = tf.tensor2d([]);
