/**
 * React renderer.
 */
// Import the styles here to process them with webpack
import 'normalize.css';
import '../../public/style.css';
import 'focus-visible/dist/focus-visible';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import Providers from './Providers';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import theme from './config/theme';

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <Providers>
        <App />
      </Providers>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('app')
);
