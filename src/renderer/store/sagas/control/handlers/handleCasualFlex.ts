import roundTo from 'round-to';
import { solveActuator } from '../formulae/solveActuator';
import { rotationSimple } from '../formulae/rotationSimple';
import { setCalculated } from '../../../ducks/control/actions';
import { AxesNumber } from '_/renderer/store/ducks/control/types';
import { ActionTypes, State, Calculated } from '../../../ducks/control/types';
import { call, cancelled, delay, select, put } from 'redux-saga/effects';
import { gcode } from '../formulae/gcode';
import matMul from '../formulae/matMul';
import serial from '../../../../utils/serialport';
import asyncDelay from 'delay';

type Action = {
  type: ActionTypes.CASUALFLEX;
};

export function* handleFlex(action: Action): any {
  console.log('running handleFlex');
  try {
    //
    const newAxes: AxesNumber = {
      x: 11,
      y: 0,
      z: 4,
      roll: 0,
      pitch: -30,
      yaw: 0,
    };

    const delayDuration = 80;

    const controlState: State = yield select((state) => state.control);

    const { calculated, config, options } = controlState;

    console.log('starting gcode routine 1');

    const { gcodeString, platformCoords, previousInput, platformCoordsBasis } =
      yield call(
        gcode,
        calculated.platform.coords,
        newAxes,
        calculated.previousInput,
        config.platform.coordsBasis,
        config.platform.homeCoords,
        options.fixedRods.len,
        config.base.coords,
        options.slice.maxChangePerSlice,
        options.slice.minSlicePerMovement,
        delayDuration / 5
      );
    console.log('ending gcode routine 1', {
      gcodeString,
      platformCoords,
      previousInput,
      platformCoordsBasis,
    });

    const newCalculated: Calculated = {
      ...calculated,
      previousInput,
      platform: {
        ...calculated.platform,
        coords: platformCoords,
      },
    };

    // const previousInputs = [30, 0, 0, 0, -30, 0];

    yield put(setCalculated(newCalculated));

    yield delay(2000);

    console.log('starting gcode routine 2 (rotatingFlex)');

    yield call(
      rotatingFlex,
      config.platform.coordsBasis,
      config.platform.homeCoords,
      options.fixedRods.len,
      config.base.coords,
      delayDuration
    );
    console.log('ending gcode routine 2 (rotatingFlex)');

    yield delay(5000);

    const homeAxes: AxesNumber = {
      x: 0,
      y: 0,
      z: 0,
      roll: 0,
      pitch: 0,
      yaw: 0,
    };

    console.log('starting gcode routine 3');

    const {
      gcodeString: gcodeString2,
      platformCoords: platformCoords2,
      previousInput: previousInput2,
      platformCoordsBasis: platformCoordsBasis2,
    } = yield call(
      gcode,
      newCalculated.platform.coords,
      homeAxes,
      newCalculated.previousInput,
      config.platform.coordsBasis,
      config.platform.homeCoords,
      options.fixedRods.len,
      config.base.coords,
      options.slice.maxChangePerSlice,
      options.slice.minSlicePerMovement,
      delayDuration / 5
    );

    console.log('ending gcode routine 3', {
      gcodeString2,
      platformCoords2,
      previousInput2,
      platformCoordsBasis2,
    });

    // handle calc here

    const newCalculated2: Calculated = {
      ...newCalculated,
      previousInput: previousInput2,
      platform: {
        ...calculated.platform,
        coords: platformCoords,
      },
    };

    yield put(setCalculated(newCalculated2));

    //
  } catch (err) {
    console.log(err);
  } finally {
    if (yield cancelled()) {
      console.log('🚨 SAGA CANCELLED: handleFlex generator was cancelled');
      // yield put(/* smth */);
    } else {
      console.log('✅ SAGA FINISHED: handleFlex finished');
    }
  }
}

const rotatingFlex = async (
  platformCoordsBasis: number[][],
  platformCoordsHome: number[][],
  fixedRodsLength: number,
  baseCoords: number[][],
  delayDuration: number,
  precision = 3
) => {
  // todo
  let angle = 0;
  let n = 0;

  for (let index = 180; index > 0; index -= 1) {
    n = n + 1;
    const change = Math.PI / 90;
    angle = angle + change;
    const x_coor = Math.cos(angle) * 30;
    const y_coor = Math.sin(angle) * 30;

    const pitch = Math.cos(angle) * (-30 / 180) * Math.PI;
    const roll = Math.sin(angle) * (30 / 180) * Math.PI;
    const rott = matMul(rotationSimple(roll, pitch, 0), platformCoordsBasis);

    const platformCoordinates = [
      rott[0].map((i) => i + x_coor),
      rott[1].map((i) => i + y_coor),
      rott[2].map((i) => i + 0),
    ].map((row, rowIndex) =>
      row.map(
        (element, columnIndex) =>
          element -
          platformCoordsBasis[rowIndex][columnIndex] +
          platformCoordsHome[rowIndex][columnIndex]
      )
    );

    const legs = solveActuator(
      platformCoordinates,
      fixedRodsLength,
      baseCoords,
      precision
    );

    const roundedLegs = legs.map((element) => roundTo(element, precision));

    const output = `G0 X${legs[0]} Y${legs[1]} Z${legs[2]} A${legs[3]} B${legs[4]} C${legs[5]}`;

    await asyncDelay(delayDuration);
    await serial.write(output);

    console.log('output', output);
  }
};
