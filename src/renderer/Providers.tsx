import React, { createContext, Reducer, useReducer } from 'react';
import { useReducerAsync } from 'use-reducer-async';

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
  Context as SixDofContext,
  reducer as sixDofReducer,
  initialState as sixDofInitialState,
} from './context/SixDofContext';

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

  const serialInitialContextValue = {
    state: serialportState,
    dispatch: serialportDispatch,
  };

  // * 6dof

  const [sixDofState, sixDofDispatch] = useReducer(
    sixDofReducer,
    sixDofInitialState
  );

  const sixDofContextValue = {
    state: sixDofState,
    dispatch: sixDofDispatch,
  };

  return (
    <>
      <SerialportContext.Provider value={serialInitialContextValue}>
        <SixDofContext.Provider value={sixDofContextValue}>
          {children}
        </SixDofContext.Provider>
      </SerialportContext.Provider>
    </>
  );
};

export default Providers;
