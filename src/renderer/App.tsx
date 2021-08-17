import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

import theme from './config/theme';
import Layout from './Layout';
import Providers from './Providers';

import { enableAllPlugins } from 'immer';

enableAllPlugins();

declare global {
  // add electron to the window interface
  interface Window {
    electron: any;
  }
}

function App() {
  window.electron.ipcRenderer.on(
    'serialport-listen',
    (event: any, message: any) => {
      console.log(message);
      // todo: handle this in state
    }
  );

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Providers>
          <Layout />
        </Providers>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
