import { rotationSimple } from './../formulae/rotationSimple';
import { toRadians } from './../formulae/toRadians';
import update from 'immutability-helper';
import { toDegrees } from './../formulae/toDegrees';
import {
  setSlicedArray,
  setUpdateAxes,
} from './../../../ducks/control/actions';
import {
  ActionTypes,
  AxesNumber,
  AxesNumberOptional,
  Calculated,
  State,
  Axes,
} from './../../../ducks/control/types';
import { call, cancelled, put, select } from 'redux-saga/effects';
import { gcode } from '../formulae/gcode';
import { setCalculated } from '_/renderer/store/ducks/control/actions';
import serialport from '_/renderer/utils/serialport';
import matMul from '../formulae/matMul';

export type Action = {
  type: any;
  axes: AxesNumberOptional;
};

export function* handleWriteToArduino(action?: Action): any {
  try {
    console.log(
      'action',
      action ||
        'no optional action was passed to the handleWriteToArduino generator function'
    );

    const controlState: State = yield select((state) => state.control);

    // check for any leftover slices in state:
    const oldSliced = yield select((store) => store.control.micro.sliced);

    console.log('oldSliced', oldSliced);

    // todo: call m114
    // compare with slices, get the nearest
    // store the

    let slicedPlatformCoords;
    let slicedPreviousInput;

    if (oldSliced.length > 0) {
      // we have an unfinished transrot, lets handle it!

      const marlinM114 = controlState.micro.m114;
      const marlinM114StringSplit = marlinM114.split(' ');

      console.log('marlinM114StringSplit', marlinM114StringSplit);

      const currentRealPose = {
        x: marlinM114StringSplit[0].slice(2),
        y: marlinM114StringSplit[0].slice(2),
        z: marlinM114StringSplit[0].slice(2),
        roll: marlinM114StringSplit[0].slice(2),
        pitch: marlinM114StringSplit[0].slice(2),
        yaw: marlinM114StringSplit[0].slice(2),
      };
      console.log('currentRealPose', currentRealPose);

      const diffs = oldSliced.map(
        (oldSlice: { axes: AxesNumber; actuators: number[] }) => {
          const { actuators } = oldSlice;
          console.log('.....');

          console.log('actuators[0]', actuators[0]);
          console.log(
            'parseFloat(currentRealPose.x)',
            parseFloat(currentRealPose.x)
          );
          console.log(
            'sub and squared',
            Math.pow(actuators[0] - parseFloat(currentRealPose.x), 2)
          );

          console.log('.....');
          const difference =
            Math.pow(actuators[0] - parseFloat(currentRealPose.x), 2) +
            Math.pow(actuators[1] - parseFloat(currentRealPose.y), 2) +
            Math.pow(actuators[2] - parseFloat(currentRealPose.z), 2) +
            Math.pow(actuators[3] - parseFloat(currentRealPose.roll), 2) +
            Math.pow(actuators[4] - parseFloat(currentRealPose.pitch), 2) +
            Math.pow(actuators[5] - parseFloat(currentRealPose.yaw), 2);

          return difference;
        }
      );

      console.log('diffs', diffs);

      const minIndex = diffs.reduce(function (
        lowestIndex: number,
        element: number,
        index: number,
        array: number[]
      ) {
        return element < array[lowestIndex] ? index : lowestIndex;
      },
      0);

      const nearestSlice = oldSliced[minIndex];

      // todo: store in state
      console.log('nearestSlice', nearestSlice);

      const nearestSliceAxes: AxesNumber = {
        ...nearestSlice.axes,
        roll: toDegrees(nearestSlice.axes.roll),
        pitch: toDegrees(nearestSlice.axes.pitch),
        yaw: toDegrees(nearestSlice.axes.yaw),
      };

      console.log('nearestSliceAxes', nearestSliceAxes);

      const newAxesFromSliced: Axes = update(
        controlState.axes,
        // todo: replace this with immer
        Object.fromEntries(
          Object.keys(nearestSliceAxes).map((key, index) => [
            key,
            { $merge: { current: Object.values(nearestSliceAxes)[index] } },
          ])
        )
      );

      // yield put(setUpdateAxes(newAxesFromSliced)); // non-blocking!!!

      // todo: calculate

      const { x, y, z } = nearestSliceAxes;

      const roll = toRadians(nearestSliceAxes.roll);
      const pitch = toRadians(nearestSliceAxes.pitch);
      const yaw = toRadians(nearestSliceAxes.yaw);

      const rotation = matMul(
        rotationSimple(roll, pitch, yaw),
        controlState.config.platform.coordsBasis
      );

      const newPlatformCoords = [
        rotation[0].map((element) => element + x),
        rotation[1].map((element) => element + y),
        rotation[2].map((element) => element + z),
      ].map((row, rowIndex) =>
        row.map(
          (element, columnIndex) =>
            element -
            controlState.config.platform.coordsBasis[rowIndex][columnIndex] +
            controlState.config.platform.homeCoords[rowIndex][columnIndex]
        )
      );
      // todo: put this in store

      // todo: store in outer scope via let

      slicedPlatformCoords = newPlatformCoords; // outer scope
      slicedPreviousInput = Object.values(nearestSliceAxes);
    }

    //
    console.log('slicedPlatformCoords', slicedPlatformCoords);
    console.log('slicedPreviousInput', slicedPreviousInput);

    const t0 = performance.now();

    const newAxes = Object.fromEntries(
      Object.entries(controlState.axes).map(([key, value]) => [
        key,
        value.current,
      ])
    ) as AxesNumber;

    console.log('newAxes', newAxes);

    const { calculated, config, options } = controlState;

    const { gcodeString, platformCoords, previousInput, platformCoordsBasis } =
      yield call(
        gcode,
        slicedPlatformCoords ?? calculated.platform.coords,
        newAxes,
        slicedPreviousInput ?? calculated.previousInput,
        config.platform.coordsBasis,
        config.platform.homeCoords,
        options.fixedRods.len,
        config.base.coords,
        options.slice.maxChangePerSlice,
        options.slice.minSlicePerMovement,
        options.delayDuration
      );

    console.log('gcodeRes', { gcodeString });

    const t1 = performance.now();

    console.log(`⏱ Call to calculate gcode took ${t1 - t0} milliseconds.`);

    const newCalculated: Calculated = {
      ...calculated,
      previousInput,
      platform: {
        ...calculated.platform,
        coords: platformCoords,
      },
    };

    yield put(setCalculated(newCalculated));
    yield put(setSlicedArray([])); // reset slicedArray
  } catch (err) {
    console.error(err);
  } finally {
    if (yield cancelled()) {
      console.log(
        '🚨 SAGA CANCELLED: handleWriteToArduino generator was cancelled'
      );

      // yield call(handleCancellation);

      // yield put(/* smth */);
    } else {
      console.log('✅ SAGA FINISHED: handleWriteToArduino finished');
    }
  }
}
