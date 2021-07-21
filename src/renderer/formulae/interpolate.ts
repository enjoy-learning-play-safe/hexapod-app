import roundTo from 'round-to';
import { solveActuator } from './solveActuator';
import * as tf from '@tensorflow/tfjs';
import { Tensor1D, Tensor2D } from '@tensorflow/tfjs';

import { rotationSimple } from './rotationSimple';
import { NewAxes } from './types';
import { overArgs } from 'lodash';

export const interpolate = (
  newAxes: NewAxes,
  previousInput: Tensor1D,
  slicingNumber: number,
  platformCoordsBasis: Tensor2D,
  platformCoordsHome: Tensor2D,
  fixedRodsLength: number,
  baseCoords: Tensor2D,
  precision = 3
) => {
  console.log('interpolate overArgs', {
    newAxes,
    previousInput: previousInput.arraySync(),
    slicingNumber,
    platformCoordsBasis: platformCoordsBasis.arraySync(),
    platformCoordsHome: platformCoordsHome.arraySync(),
    fixedRodsLength,
    baseCoords,
  });

  const axesArray = Object.entries(newAxes);

  const prevInputArray = previousInput.arraySync();

  let finalValue = null;

  for (let i = 1; i <= slicingNumber; i++) {
    const intermediate = Object.fromEntries(
      axesArray.map(([axis, value], index) => [
        axis,
        ((value - prevInputArray[index]) / slicingNumber) * i +
          prevInputArray[index],
      ])
    );

    const rotated = tf.matMul(
      rotationSimple(intermediate.roll, intermediate.pitch, intermediate.yaw),
      platformCoordsBasis
    );

    const rotatedArray = rotated.arraySync();

    // console.log('rotated', rotated.arraySync());

    const intermediatePlatformCoords = tf
      .stack([
        rotated.gather(0).add(intermediate.x),
        rotated.gather(1).add(intermediate.y),
        rotated.gather(2).add(intermediate.z),
      ])
      .sub(platformCoordsBasis)
      .add(platformCoordsHome) as Tensor2D;

    const intermediatePlatformCoordsArray = rotated.arraySync();

    // console.log(
    //   'intermediatePlatformCoords',
    //   intermediatePlatformCoords.arraySync()
    // );

    const legs = solveActuator(
      intermediatePlatformCoords,
      fixedRodsLength,
      baseCoords,
      precision
    )
      .arraySync()
      .map((num) => (precision ? roundTo(num, precision) : num));

    const legsArray = rotated.arraySync();

    // console.log('legs', legs);

    const gcodeString = `G0 X${legs[0]} Y${legs[1]} Z${legs[2]} A${legs[3]} B${legs[4]} C${legs[5]}`;

    console.log('gcodeString', gcodeString);

    // todo: write to serial

    finalValue = { gcodeString };
  }
  return { finalValue };
};
