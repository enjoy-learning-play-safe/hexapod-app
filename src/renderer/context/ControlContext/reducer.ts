import { Reducer } from 'react';
import update from 'immutability-helper';

import {
  Action,
  InnerResetStateAxes,
  InnerSetStateAxes,
  SetLiveInput,
} from './actions';
import { State, initialState } from './state';
import Types from './types';

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    // * Inner actions
    case Types.INNER_SET_STATE_AXES:
      return innerSetStateAxes(state, action);
    case Types.INNER_RESET_STATE_AXES:
      return innerResetStateAxes(state, action);
    case Types.INNER_SET_NEW_CALC:
      return state;
    case Types.INNER_SET_NEW_STORE:
      return state;
    case Types.INNER_INITIALIZE_STATE:
      return state;

    // * outer sync actions
    case Types.SET_LIVE_INPUT:
      return setLiveInput(state, action);
    default:
      return state;
  }
};

const innerSetStateAxes = (state: State, action: InnerSetStateAxes) => {
  const { axes } = action.payload;
  // return state;
  const newState = update(state, {
    axes: Object.fromEntries(
      Object.keys(axes).map((key, index) => [
        key,
        { $merge: { current: Object.values(axes)[index] } },
      ])
    ),
  });
  console.log(newState);

  return newState;
};

const innerResetStateAxes = (state: State, action: InnerResetStateAxes) => {
  return update(state, { $merge: { axes: initialState.axes } });
};

const setLiveInput = (state: State, action: SetLiveInput) => {
  return update(state, { $merge: { liveInput: action.payload } });
};
