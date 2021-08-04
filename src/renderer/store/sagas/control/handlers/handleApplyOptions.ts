import { SagaIterator } from 'redux-saga';
import { cancelled, put, select } from 'redux-saga/effects';
import calcFromOptions from '_/renderer/formulae/calcFromOptions';

import { setApplyOptions } from './../../../ducks/control/actions';
import {
  Options,
  ActionTypes,
  Config,
  Calculated,
  Axes,
} from './../../../ducks/control/types';

type Action = {
  type: ActionTypes.APPLY_OPTIONS;
  options: Options;
  axes: Axes;
};

export function* handleApplyOptions(action: Action): SagaIterator {
  console.log('SAGA - handleApplyOptions running', action);
  try {
    const { options } = action;

    const { axes: currentAxes } = yield select((state) => state.control);

    console.log('action', action);

    // calculate config and calculatedx
    console.log('currentAxes', currentAxes);
    const { config, calculated, axes } = calcFromOptions(options, currentAxes);

    console.log({ config, calculated });

    yield put(setApplyOptions(options, config, calculated, axes));
  } catch (err) {
    console.error(err);
  } finally {
    if (yield cancelled()) {
      console.log('handleApplyOptions generator was cancelled');
      // yield put(/* smth */);
    }
    console.log('SAGA - handleApplyOptions finished');
  }
}
