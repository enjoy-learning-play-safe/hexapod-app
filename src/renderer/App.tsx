import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import TitleBar from './components/TitleBar';
import Router from './Router';

function App() {
  return (
    <BrowserRouter>
      <TitleBar />
      Hello I am react!
      <Router />
    </BrowserRouter>
  );
}

export default App;
