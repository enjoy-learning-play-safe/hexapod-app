import { put, takeEvery, all } from 'redux-saga/effects';
import {
  watchApplyOptions,
  watchUpdateAxes,
  watchWriteToArduino,
} from './control';

export default function* rootSaga() {
  yield all([watchApplyOptions(), watchUpdateAxes(), watchWriteToArduino()]);
}
