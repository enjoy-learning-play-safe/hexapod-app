/**
 * @jest-environment jsdom
 */

import roundTo from 'round-to';
import delay from 'delay';

import serial from '../../../../utils/serialport';

import { solveActuator } from './solveActuator';
import { rotationSimple } from './rotationSimple';
import matMul from './matMul';
import { AxesNumber } from '_/renderer/store/ducks/control/types';

export const interpolate = async (
  newAxes: AxesNumber,
  previousInput: number[],
  slicingNumber: number,
  platformCoordsBasis: number[][],
  platformCoordsHome: number[][],
  fixedRodsLength: number,
  baseCoords: number[][],
  delayDuration: number,
  precision = 3
) => {
  console.log('interpolate overArgs', {
    newAxes,
    previousInput: previousInput,
    slicingNumber,
    platformCoordsBasis,
    platformCoordsHome,
    fixedRodsLength,
    baseCoords,
  });

  const axesArray = Object.entries(newAxes);
  console.log('newAxes', newAxes);

  const prevInputArray = previousInput;

  let finalValue = null;

  for (let i = 1; i <= slicingNumber; i++) {
    const intermediate = Object.fromEntries(
      // ! bug here!
      axesArray.map(([axis, value], index) => [
        axis,
        (((value as number) - prevInputArray[index]) / slicingNumber) * i +
          prevInputArray[index],
      ])
    );

    const rotatedSimple = rotationSimple(
      intermediate.roll,
      intermediate.pitch,
      intermediate.yaw
    );

    console.log('intx', intermediate.x);
    console.log('inty', intermediate.y);
    console.log('intz', intermediate.z);
    console.log('introll', intermediate.roll);
    console.log('intpitch', intermediate.pitch);
    console.log('intyaw', intermediate.yaw);
    console.log('coordsbasis', platformCoordsBasis);

    const rotated = matMul(rotatedSimple, platformCoordsBasis);

    const intermediatePlatformCoords = [
      rotated[0].map((element) => element + intermediate.x),
      rotated[1].map((element) => element + intermediate.y),
      rotated[2].map((element) => element + intermediate.z),
    ].map((row, rowIndex) =>
      row.map(
        (element, columnIndex) =>
          element -
          platformCoordsBasis[rowIndex][columnIndex] +
          platformCoordsHome[rowIndex][columnIndex]
      )
    );

    const legs = solveActuator(
      intermediatePlatformCoords,
      fixedRodsLength,
      baseCoords,
      precision
    ).map((num) => (precision ? roundTo(num, precision) : num));

    const gcodeString = `G0 X${legs[0]} Y${legs[1]} Z${legs[2]} A${legs[3]} B${legs[4]} C${legs[5]}`;

    console.log('gcodeString', gcodeString);

    // todo: write to serial
    delayDuration && (await delay(delayDuration));
    await serial.write(gcodeString ?? '');

    await serial.write('M114');

    finalValue = { gcodeString };
    await delay(500); // TODO: remove this forced delay
  }
  return { finalValue };
};
