/**
 * React renderer.
 */
// Import the styles here to process them with webpack
import 'normalize.css';
import '../../public/style.css';

import { ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import theme from './config/theme';

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);
