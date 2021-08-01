import { ActionTypes, Config, Options, Calculated } from './types';

// ? init

// apply config
export const applyOptions = (options: Options) => ({
  type: ActionTypes.APPLY_OPTIONS,
  options,
});

export const setApplyOptions = (config: Config, calculated: Calculated) => ({
  type: ActionTypes.SET_APPLY_OPTIONS,
  config,
  calculated,
});

// home

// set

// reset
