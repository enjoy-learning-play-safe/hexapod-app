import { Reducer } from 'react';
import update from 'immutability-helper';

import { Action, InnerSetStateAxes } from './actions';
import { State } from './state';
import Types from './types';

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    // * Inner actions
    case Types.INNER_SET_STATE_AXES:
      return innerSetStateAxes(state, action);
    case Types.INNER_SET_NEW_CALC:
      return state;
    case Types.INNER_SET_NEW_STORE:
      return state;
    // outer sync actions
    case Types.SET_LIVE_INPUT:
      return state;
    default:
      return state;
  }
};

const innerSetStateAxes = (state: State, action: InnerSetStateAxes) => {
  return update(state, {
    axes: {
      $merge: { ...action.payload.axes },
    },
  });
};
