import * as tf from '@tensorflow/tfjs';
import { Tensor2D } from '@tensorflow/tfjs';

import roundTo from 'round-to';

export const solveActuator = async (
  platformCoords: Tensor2D,
  fixedRodsLength: number,
  baseCoords: Tensor2D,
  precision?: number
) => {
  const numLegs = (await platformCoords.gather(0).array()).length;

  const platformX = (await platformCoords.gather(0).array()) as any;
  const platformY = (await platformCoords.gather(1).array()) as any;
  const platformZ = (await platformCoords.gather(2).array()) as any;

  const baseX = (await baseCoords.gather(0).array()) as any;
  const baseY = (await baseCoords.gather(1).array()) as any;
  // const baseZ = await baseCoords.gather(2).array();

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
