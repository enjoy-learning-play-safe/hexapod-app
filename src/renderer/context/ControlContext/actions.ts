import { AxesNumberOptional, State } from './state';
import Types from './types';

export type InnerSetStateAxes = {
  type: Types.INNER_SET_STATE_AXES;
  payload: {
    axes: AxesNumberOptional;
  };
};

export type InnerResetStateAxes = {
  type: Types.INNER_RESET_STATE_AXES;
};

export type InnerSetCalculated = {
  type: Types.INNER_SET_CALCULATED;
  payload: Record<string, unknown>;
};

//

export type SetLiveInput = {
  type: Types.SET_LIVE_INPUT;
  payload: boolean;
};

//

export type ApplyConfig = {
  type: Types.APPLY_CONFIG;
  payload: State['config'];
};

//
//
//

export type InnerAction =
  // actions that are wrapped in an async and should not be called directly
  | InnerSetStateAxes
  | InnerResetStateAxes
  | { type: Types.INNER_INITIALIZE_STATE }
  | { type: Types.INNER_SET_CALCULATED; payload: {} }
  | { type: Types.INNER_SET_NEW_CALC; payload: {} }
  | { type: Types.INNER_SET_NEW_STORE; payload: {} }
  | { type: Types.INNER_SET_CONFIG; payload: {} };

export type AsyncAction =
  | {
      type: Types.SET_AXES;
      payload: { axes: AxesNumberOptional };
    }
  | { type: Types.PUSH_TO_ARDUINO }
  | { type: Types.RESET_AXES }
  | ApplyConfig;

export type OuterAction = SetLiveInput;

export type Action = InnerAction | OuterAction;
