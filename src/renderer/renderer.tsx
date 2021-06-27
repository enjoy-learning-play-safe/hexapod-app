/**
 * React renderer.
 */
// Import the styles here to process them with webpack
import 'normalize.css';
import '../../public/style.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);
