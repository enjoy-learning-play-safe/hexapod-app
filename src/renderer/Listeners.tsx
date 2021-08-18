import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { setM114, setPlannerBuffer } from './store/ducks/control/actions';

const Listeners = () => {
  const dispatch = useDispatch();

  console.log();

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
      console.log('m154 ipc: ', message);
      // todo: handle this in state
      dispatch(setM114(message));
    }
  );

  window.electron.ipcRenderer.on(
    'serialport-listen-pb',
    (event: any, message: any) => {
      console.log('pb ipc: ', message);
      // todo: handle this in state
      // dispatch(setPlannerBuffer(message));
    }
  );

  return null;
};

export default Listeners;
