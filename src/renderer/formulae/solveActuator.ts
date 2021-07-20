import * as tf from '@tensorflow/tfjs';
import { Tensor2D } from '@tensorflow/tfjs';

import roundTo from 'round-to';

export const solveActuator = (
  platformCoords: Tensor2D,
  fixedRodsLength: number,
  baseCoords: Tensor2D,
  precision?: number
) => {
  const numLegs = platformCoords.gather(0).arraySync().length;

  const platformX = platformCoords.gather(0).arraySync() as any;
  const platformY = platformCoords.gather(1).arraySync() as any;
  const platformZ = platformCoords.gather(2).arraySync() as any;

  const baseX = baseCoords.gather(0).arraySync() as any;
  const baseY = baseCoords.gather(1).arraySync() as any;
  // const baseZ = baseCoords.gather(2).arraySync();

  const legsArray = new Array(numLegs)
    .fill(undefined)
    .map(
      (undef, index) =>
        platformZ[index] -
        Math.abs(
          fixedRodsLength ** 2 -
            (platformX[index] - baseX[index]) ** 2 -
            (platformY[index] - baseY[index]) ** 2
        ) **
          0.5
    );

  const legs = tf.tensor1d(
    legsArray.map((element) =>
      precision ? roundTo(element, precision) : element
    )
  );

  return legs;
};
