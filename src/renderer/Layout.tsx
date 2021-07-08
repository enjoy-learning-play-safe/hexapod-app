import React from 'react';

import Container from './components/Container';
import Content from './components/Content';
import SideBar from './components/SideBar';
import TitleBar from './components/TitleBar';
import Wrapper from './components/Wrapper';
import Router from './Router';

const Layout = () => {
  return (
    <Container>
      <TitleBar />
      <Wrapper>
        <SideBar />
        <Content>
          <Router />
        </Content>
      </Wrapper>
    </Container>
  );
};

export default Layout;
