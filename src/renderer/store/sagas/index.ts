import { put, takeEvery, all } from 'redux-saga/effects';
import { watchApplyOptions } from './control';

export default function* rootSaga() {
  yield all([watchApplyOptions()]);
}
