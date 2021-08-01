import React, { createContext, Reducer, useReducer } from 'react';
import { useReducerAsync } from 'use-reducer-async';
import { Provider as ReduxProvider } from 'react-redux';

import store from './store';

import {
  Context as SerialportContext,
  State as SerialportState,
  Action as SerialportAction,
  AsyncAction as SerialportAsyncAction,
  OuterAction as SerialportOuterAction,
  ContextValue as SerialportContextValue,
  reducer as SerialportReducer,
  initialState as serialportInitialState,
  asyncActionHandlers as serialportAsyncActionHandlers,
} from './context/SerialportContext';

import {
  Context as ControlContext,
  State as ControlState,
  Action as ControlAction,
  AsyncAction as ControlAsyncAction,
  OuterAction as ControlOuterAction,
  ContextValue as ControlContextValue,
  reducer as controlReducer,
  initialState as controlInitialState,
  asyncActionHandlers as controlAsyncActionHandlers,
} from './context/ControlContext';

interface Props {
  children: React.ReactNode;
}

const Providers = (props: Props) => {
  const { children } = props;

  // * Serialport

  const [serialportState, serialportDispatch] = useReducerAsync<
    Reducer<SerialportState, SerialportAction>,
    SerialportAsyncAction,
    SerialportAsyncAction | SerialportOuterAction
  >(SerialportReducer, serialportInitialState, serialportAsyncActionHandlers);

  const serialInitialContextValue: SerialportContextValue = {
    state: serialportState,
    dispatch: serialportDispatch,
  };

  // * Control

  const [controlState, controlDispatch] = useReducerAsync<
    Reducer<ControlState, ControlAction>,
    ControlAsyncAction,
    ControlAsyncAction | ControlOuterAction
  >(controlReducer, controlInitialState, controlAsyncActionHandlers);

  const controlContextValue: ControlContextValue = {
    state: controlState,
    dispatch: controlDispatch,
  };

  return (
    <>
      <ReduxProvider store={store}>
        <SerialportContext.Provider value={serialInitialContextValue}>
          <ControlContext.Provider value={controlContextValue}>
            {children}
          </ControlContext.Provider>
        </SerialportContext.Provider>
      </ReduxProvider>
    </>
  );
};

export default Providers;
