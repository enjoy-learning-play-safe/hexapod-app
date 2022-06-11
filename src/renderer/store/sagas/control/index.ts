import { takeLatest } from 'redux-saga/effects';

import { ActionTypes } from '../../ducks/control/types';
import { handleApplyOptions } from './handlers/handleApplyOptions';
import { handleCasualFlex } from './handlers/handleCasualFlex';
import { handleFlex } from './handlers/handleFlex';
import { handleUpdateAxes } from './handlers/handleUpdateAxes';
import { handleWriteToArduino } from './handlers/handleWriteToArduino';

export function* watchApplyOptions() {
  yield takeLatest(ActionTypes.APPLY_OPTIONS, handleApplyOptions);
}

export function* watchUpdateAxes() {
  yield takeLatest(ActionTypes.UPDATE_AXES, handleUpdateAxes);
}

export function* watchWriteToArduino() {
  yield takeLatest(ActionTypes.WRITE_TO_ARDUINO, handleWriteToArduino);
}

export function* watchFlex() {
  yield takeLatest(ActionTypes.FLEX, handleFlex);
}

export function* watchCasualFlex() {
  yield takeLatest(ActionTypes.CASUALFLEX, handleCasualFlex);
}
