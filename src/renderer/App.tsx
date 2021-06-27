import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import TitleBar from './components/TitleBar';
import theme from './config/theme';
import Router from './Router';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <TitleBar />
        Hello I am react!
        <Router />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
