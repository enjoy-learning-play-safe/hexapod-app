import React, { createContext, Reducer } from 'react';
import { useReducerAsync } from 'use-reducer-async';

import {
  SerialportContext,
  State as SerialportState,
  Action as SerialportAction,
  AsyncAction as SerialportAsyncAction,
  OuterAction as SerialportOuterAction,
  ContextValue as SerialportContextValue,
  reducer as SerialportReducer,
  initialState as serialportInitialState,
  asyncActionHandlers as serialportAsyncActionHandlers,
} from './context/SerialportContext';

interface Props {
  children: React.ReactNode;
}

const Providers = (props: Props) => {
  const { children } = props;

  const [serialportState, serialportDispatch] = useReducerAsync<
    Reducer<SerialportState, SerialportAction>,
    SerialportAsyncAction,
    SerialportAsyncAction | SerialportOuterAction
  >(SerialportReducer, serialportInitialState, serialportAsyncActionHandlers);

  const initialContextValue = {
    state: serialportState,
    dispatch: serialportDispatch,
  };

  return (
    <>
      <SerialportContext.Provider value={initialContextValue}>
        {children}
      </SerialportContext.Provider>
    </>
  );
};

export default Providers;
