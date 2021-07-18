import { AxesOptional } from './state';
import Types from './types';

export type InnerSetStateAxes = {
  type: Types.INNER_SET_STATE_AXES;
  payload: {
    axes: AxesOptional;
  };
};

export type InnerAction =
  // actions that are wrapped in an async and should not be called directly
  | InnerSetStateAxes
  | { type: Types.INNER_SET_NEW_CALC; value: {} }
  | { type: Types.INNER_SET_NEW_STORE; value: {} };

export type AsyncAction = {
  type: Types.SET_AXES;
  payload: { axes: AxesOptional };
};

export type OuterAction = {
  type: Types.SET_LIVE_INPUT;
};

export type Action = InnerAction | OuterAction;
