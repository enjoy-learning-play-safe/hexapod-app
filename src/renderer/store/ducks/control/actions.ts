import {
  ActionTypes,
  Config,
  Options,
  Calculated,
  AxesNumberOptional,
} from './types';

// ? init

// apply config

export const applyOptions = (options: Options) => ({
  type: ActionTypes.APPLY_OPTIONS,
  options,
});

export const setApplyOptions = (
  options: Options,
  config: Config,
  calculated: Calculated
) => ({
  type: ActionTypes.SET_APPLY_OPTIONS,
  options,
  config,
  calculated,
});

// home

// set Axes

export const updateAxes = (axes: AxesNumberOptional) => ({
  type: ActionTypes.UPDATE_AXES,
  axes,
});

export const setUpdateAxes = () => ({
  type: ActionTypes.SET_UPDATE_AXES,
});

// write to arduino

// reset
