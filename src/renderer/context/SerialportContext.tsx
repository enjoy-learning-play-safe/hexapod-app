import { createContext, Reducer } from 'react';
import delay from 'delay';
import { AsyncActionHandlers } from 'use-reducer-async';

export type Port = {
  locationId?: string;
  manufacturer?: string;
  path: string;
  pnpId?: string;
  productId?: string;
  serialNumber?: string;
  vendorId?: string;
};

export type State = {
  port: string;
  loading: boolean;
  connected: boolean;
  list: Port[];
};

export const initialState: State = {
  port: '',
  loading: false, // TODO
  connected: false,
  list: [],
};

export type InnerAction =  // actions that are wrapped in an async and should not be called directly
  | { type: 'SYNC_LIST'; list: Port[] }
  | { type: 'SYNC_OPEN'; port: string; baudRate: number }
  | { type: 'SYNC_INITIALIZE' }
  | { type: 'SYNC_HOME' }
  | { type: 'SYNC_WRITE' }
  | { type: 'SYNC_CLOSE' };

export type OuterAction = { type: 'something' }; // actions that are not wrapped in an asycn and can be called directly

export type Action = InnerAction | OuterAction;

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'SYNC_LIST':
      return {
        ...state,
        list: action.list,
      };
    case 'SYNC_OPEN':
      return {
        ...state,
        loading: false,
        connected: true,
        port: action.port,
      };
    case 'SYNC_WRITE':
      return {
        ...state,
        loading: false,
      };
    case 'SYNC_INITIALIZE':
      return {
        ...state,
        loading: false,
      };
    case 'SYNC_HOME':
      return {
        ...state,
        loading: false,
      };
    case 'SYNC_WRITE':
      return {
        ...state,
        loading: false,
      };
    default:
      throw new Error('unknown action type');
  }
};

export type AsyncAction =
  | { type: 'LIST' }
  | { type: 'OPEN'; port: string; baudRate?: number }
  | { type: 'INITIALIZE' }
  | { type: 'HOME' }
  | { type: 'WRITE'; message: string }
  | { type: 'CLOSE' };

export const asyncActionHandlers: AsyncActionHandlers<
  Reducer<State, Action>,
  AsyncAction
> = {
  LIST:
    ({ dispatch }) =>
    async (action) => {
      const list = await window.electron.ipcRenderer.invoke('serialport', {
        action: 'list',
      });
      console.log('reducer -> async -> list', list);
      dispatch({ type: 'SYNC_LIST', list });
    },
  OPEN:
    ({ dispatch }) =>
    async (action) => {
      const openRes = await window.electron.ipcRenderer.invoke('serialport', {
        action: 'open',
        payload: {
          port: action.port,
        },
      });
      console.log('REACT: PORT OPENED', openRes);
      dispatch({ type: 'SYNC_OPEN', port: action.port, baudRate: 250000 });
    },
  INITIALIZE:
    ({ dispatch }) =>
    async (action) => {
      for (let i = 0; i <= 23; i += 1) {
        console.log('react: sending for i = ', i);
        await window.electron.ipcRenderer.invoke('serialport', {
          action: 'write',
          payload: {
            message: `G90\r\n`,
          },
        });
        await delay(150);
      }
      // await window.electron.ipcRenderer.invoke('serialport', {
      //   action: 'flush',
      // });
      dispatch({ type: 'SYNC_INITIALIZE' });
    },
  HOME:
    ({ dispatch }) =>
    async (action) => {
      await window.electron.ipcRenderer
        .invoke('serialport', {
          action: 'write',
          payload: {
            message: 'G28\r\n',
          },
        })
        .then(async () => {
          await delay(150);
          console.log('react:  HOME - G28');
          await window.electron.ipcRenderer.invoke('serialport', {
            action: 'write',
            payload: {
              message: 'G0 X100 Y100 Z100 A100 B100 C100\r\n',
            },
          });
        });
      console.log('react:  HOME - G0 xyzabc');
      dispatch({ type: 'SYNC_HOME' });
    },
  WRITE:
    ({ dispatch }) =>
    async (action) => {
      await window.electron.ipcRenderer.invoke('serialport', {
        action: 'write',
        payload: {
          message: action.message + '\r\n',
        },
      });

      dispatch({ type: 'SYNC_WRITE' });
    },
  CLOSE:
    ({ dispatch }) =>
    async (action) => {
      const list = await window.electron.ipcRenderer.invoke('serialport', {
        action: 'list',
      });
      dispatch({ type: 'SYNC_LIST', list });
    },
};

export type ContextValue = {
  state: State;
  dispatch: React.Dispatch<OuterAction | AsyncAction>;
};

export const SerialportContext = createContext<ContextValue>({
  state: initialState,
  dispatch: () => {},
});
