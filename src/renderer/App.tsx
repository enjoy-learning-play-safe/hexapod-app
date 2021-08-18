import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import theme from './config/theme';
import Layout from './Layout';

import { enableAllPlugins } from 'immer';
import { useDispatch } from 'react-redux';
import { setM114, setPlannerBuffer } from './store/ducks/control/actions';

enableAllPlugins();

declare global {
  // add electron to the window interface
  interface Window {
    electron: any;
  }
}

function App() {
  const dispatch = useDispatch();

  window.electron.ipcRenderer.on(
    'serialport-listen',
    (event: any, message: any) => {
      console.log('ipc listener:', message);
      // todo: handle this in state
    }
  );

  window.electron.ipcRenderer.on(
    'serialport-listen-m114',
    (event: any, message: any) => {
      console.log('m114 ipc: ', message);
      // todo: handle this in state
      dispatch(setM114(message));
    }
  );

  window.electron.ipcRenderer.on(
    'serialport-listen-pb',
    (event: any, message: any) => {
      console.log('pb ipc: ', message);
      // todo: handle this in state
      dispatch(setPlannerBuffer(message));
    }
  );

  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
