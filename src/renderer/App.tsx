import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

import Container from './components/Container';
import Content from './components/Content';
import SideBar from './components/SideBar';
import TitleBar from './components/TitleBar';
import Wrapper from './components/Wrapper';
import theme from './config/theme';
import Router from './Router';

declare global {
  // add electron to the window interface
  interface Window {
    electron: any;
  }
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Container>
          <TitleBar />
          <Wrapper>
            <SideBar />
            <Content>
              <Router />
            </Content>
          </Wrapper>
        </Container>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
