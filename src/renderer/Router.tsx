import React from 'react';

import { Switch, Route } from 'react-router-dom';

import AxisConfig from './pages/AxisConfig';
import Control from './pages/Control';
import Debug from './pages/Debug';
import Settings from './pages/Settings';
import UserGuide from './pages/UserGuide';
import FlexScreen from './pages/FlexScreen';

const Router: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Control />
      </Route>
      <Route path="/flex">
        <FlexScreen />
      </Route>
      <Route path="/axis-config">
        <AxisConfig />
      </Route>
      <Route path="/debug">
        <Debug />
      </Route>
      <Route path="/user-guide">
        <UserGuide />
      </Route>
      <Route path="/settings">
        <Settings />
      </Route>
      <Route path="*">
        <Control />
      </Route>
    </Switch>
  );
};

export default Router;
