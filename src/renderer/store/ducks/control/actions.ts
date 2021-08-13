import {
  ActionTypes,
  Config,
  Options,
  Calculated,
  AxesNumberOptional,
  Axes,
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
  calculated: Calculated,
  axes: Axes
) => ({
  type: ActionTypes.SET_APPLY_OPTIONS,
  options,
  config,
  calculated,
  axes,
});

// home

// set Axes

export const updateAxes = (axes: AxesNumberOptional) => ({
  type: ActionTypes.UPDATE_AXES,
  axes,
});

export const setUpdateAxes = (axes: Axes) => ({
  type: ActionTypes.SET_UPDATE_AXES,
  axes,
});

// set Calculated

export const setCalculated = (calculated: Calculated) => ({
  type: ActionTypes.SET_CALCULATED,
  calculated,
});

// write to arduino

export const writeToArduino = () => ({
  type: ActionTypes.WRITE_TO_ARDUINO,
});

// reset

// live input

export const setLiveInput = (liveInput?: Boolean) => ({
  type: ActionTypes.SET_LIVE_INPUT,
  ...(liveInput ? { liveInput } : {}),
});
