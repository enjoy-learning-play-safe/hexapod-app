import {
  ActionTypes,
  AxesNumberOptional,
  Axes,
  AxesNumber,
  State,
} from './../../../ducks/control/types';
import update from 'immutability-helper';
import { call, cancelled, put, putResolve, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { setUpdateAxes } from '_/renderer/store/ducks/control/actions';

import { handleWriteToArduino } from './handleWriteToArduino';

type Action = {
  type: ActionTypes.UPDATE_AXES;
  axes: AxesNumberOptional;
};

export function* handleUpdateAxes(action: Action): any {
  try {
    console.log('action', action);

    // get state
    let controlState: State = yield select((state) => state.control);

    // // update state sync
    const { axes: axesNumber } = action;

    const newAxes: Axes = update(
      controlState.axes,
      // todo: replace this with immer
      Object.fromEntries(
        Object.keys(axesNumber).map((key, index) => [
          key,
          { $merge: { current: Object.values(axesNumber)[index] } },
        ])
      )
    );

    yield put(setUpdateAxes(newAxes));
    // if live input is true, then we need to fire the final input via serial

    const arduinoAction = {
      type: ActionTypes.UPDATE_AXES,
      axes: axesNumber,
    };

    if (controlState.liveInput) {
      yield call(handleWriteToArduino, arduinoAction);
    }
  } catch (err) {
    console.error(err);
  } finally {
    if (yield cancelled()) {
      console.log(
        '🚨 SAGA CANCELLED: handleUpdateAxes generator was cancelled'
      );
      // yield put(/* smth */);
    } else {
      console.log('✅ SAGA FINISHED: handleUpdateAxes finished');
    }
  }
}
