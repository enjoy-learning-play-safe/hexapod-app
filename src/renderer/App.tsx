import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import theme from './config/theme';
import Layout from './Layout';

import { enableAllPlugins } from 'immer';
import Listeners from './Listeners';

enableAllPlugins();

declare global {
  // add electron to the window interface
  interface Window {
    electron: any;
  }
}

function App() {
  return (
    <BrowserRouter>
      <Listeners />
      <Layout />
    </BrowserRouter>
  );
}

export default App;
