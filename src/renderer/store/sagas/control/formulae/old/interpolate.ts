import roundTo from 'round-to';
import * as tf from '@tensorflow/tfjs';
import { Tensor1D, Tensor2D } from '@tensorflow/tfjs';

import { NewAxes } from './types';
import { solveActuator } from './solveActuator';
import { rotationSimple } from './rotationSimple';
import serial from '../utils/serialport';
import delay from 'delay';

export const interpolate = async (
  newAxes: NewAxes,
  previousInput: Tensor1D,
  slicingNumber: number,
  platformCoordsBasis: Tensor2D,
  platformCoordsHome: Tensor2D,
  fixedRodsLength: number,
  baseCoords: Tensor2D,
  delayDuration: number,
  precision = 3
) => {
  console.log('interpolate overArgs', {
    newAxes,
    previousInput: await previousInput.array(),
    slicingNumber,
    platformCoordsBasis: await platformCoordsBasis.array(),
    platformCoordsHome: await platformCoordsHome.array(),
    fixedRodsLength,
    baseCoords,
  });

  const axesArray = Object.entries(newAxes);

  const prevInputArray = await previousInput.array();

  let finalValue = null;

  for (let i = 1; i <= slicingNumber; i++) {
    const intermediate = Object.fromEntries(
      axesArray.map(([axis, value], index) => [
        axis,
        ((value - prevInputArray[index]) / slicingNumber) * i +
          prevInputArray[index],
      ])
    );

    const rotatedSimple = rotationSimple(
      intermediate.roll,
      intermediate.pitch,
      intermediate.yaw
    );

    console.log('introll', intermediate.roll);
    console.log('intpitch', intermediate.pitch);
    console.log('intyaw', intermediate.yaw);
    console.log('coordsbasis', await platformCoordsBasis.array());

    const rotated = tf.matMul(rotatedSimple, platformCoordsBasis);

    const intermediatePlatformCoords = tf
      .stack([
        rotated.gather(0).add(intermediate.x),
        rotated.gather(1).add(intermediate.y),
        rotated.gather(2).add(intermediate.z),
      ])
      .sub(platformCoordsBasis)
      .add(platformCoordsHome) as Tensor2D;

    const legs = (
      await (
        await solveActuator(
          intermediatePlatformCoords,
          fixedRodsLength,
          baseCoords,
          precision
        )
      ).array()
    ).map((num) => (precision ? roundTo(num, precision) : num));

    const gcodeString = `G0 X${legs[0]} Y${legs[1]} Z${legs[2]} A${legs[3]} B${legs[4]} C${legs[5]}`;

    console.log('gcodeString', gcodeString);

    // todo: write to serial
    delayDuration && (await delay(delayDuration));
    // await serial.write(gcodeString ?? '');

    finalValue = { gcodeString };
  }
  return { finalValue };
};