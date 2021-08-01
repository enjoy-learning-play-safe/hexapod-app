import { takeLatest } from 'redux-saga/effects';

import { ActionTypes } from '../../ducks/control/types';
import { handleApplyOptions } from './handlers/handleApplyOptions';

export function* watchApplyOptions() {
  yield takeLatest(ActionTypes.APPLY_OPTIONS, handleApplyOptions);
}
