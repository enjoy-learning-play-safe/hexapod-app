import { SagaIterator } from 'redux-saga';
import { cancelled, put } from 'redux-saga/effects';
import calcFromOptions from '_/renderer/formulae/calcFromOptions';
import {
  platformCoordsHome,
  platformCoordsBasis,
  baseCoords,
  previousInput,
  platformAngles,
} from './../../../../context/ControlContext/constants';
import { setApplyOptions } from './../../../ducks/control/actions';
import {
  Options,
  ActionTypes,
  Config,
  Calculated,
} from './../../../ducks/control/types';

type Action = {
  type: ActionTypes.APPLY_OPTIONS;
  options: Options;
};

export function* handleApplyOptions(action: Action): SagaIterator {
  console.log('SAGA - handleApplyOptions running', action);
  try {
    const { options } = action;

    // calculate config and calculated
    const { config, calculated } = calcFromOptions(options);

    console.log({ config, calculated });

    yield put(setApplyOptions(options, config, calculated));
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
