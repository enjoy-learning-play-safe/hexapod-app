import { AsyncAction } from './actions';
// this context is for receiving 6dof actions, computing the relevant gcode, and sending it via serial to the microcontroller

import { createContext } from 'react';
import { OuterAction } from './actions';
import { initialState, State } from './state';

// * Local Exports

export type ContextValue = {
  state: State;
  dispatch: React.Dispatch<OuterAction | AsyncAction>;
};

export const Context = createContext<ContextValue>({
  state: initialState,
  dispatch: () => {},
});

// Exports from sister files
export { reducer } from './reducer';
export { initialState } from './state';
