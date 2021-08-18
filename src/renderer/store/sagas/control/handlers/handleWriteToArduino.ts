import {
  ActionTypes,
  AxesNumber,
  AxesNumberOptional,
  Calculated,
  State,
} from './../../../ducks/control/types';
import { call, cancelled, put, select } from 'redux-saga/effects';
import { gcode } from '../formulae/gcode';
import { setCalculated } from '_/renderer/store/ducks/control/actions';
import serialport from '_/renderer/utils/serialport';

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
        calculated.platform.coords,
        newAxes,
        calculated.previousInput,
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

const handleCancellation = async () => {
  // todo: call M114 over serial to get position of actuators

  const p = new Promise((resolve) => {
    // This assumes that the events are mutually exclusive

    window.electron.ipcRenderer.once(
      'serialport-listen-m114',
      (event: any, message: any) => {
        console.log('cancelled m114 response:', message);
        // todo: handle this in state
        resolve(true);
      }
    );

    // zwave.on('driver ready', () => resolve(true));
    // zwave.on('driver failed', () => resolve(false));
  });

  console.log('🏃 handleCancellation running');

  await serialport.write('M114');

  await p;

  // delay(600);

  console.log('🏁 handleCancellation complete');

  // todo: listen to ipcrenderer here

  // todo: compare current position with sliced array

  // find nearest index in sliced array, then set to state.
};
