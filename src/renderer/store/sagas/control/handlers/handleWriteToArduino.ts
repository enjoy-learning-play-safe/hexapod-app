import {
  ActionTypes,
  AxesNumber,
  AxesNumberOptional,
  State,
} from './../../../ducks/control/types';
import { SagaIterator } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { gcode } from '../formulae/gcode';
import { setCalculated } from '_/renderer/store/ducks/control/actions';

type Action = {
  type: any;
  axes: AxesNumberOptional;
};

export function* handleWriteToArduino(action: Action): any {
  console.log('action', action);
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

  yield put(setCalculated(calculated));
}
