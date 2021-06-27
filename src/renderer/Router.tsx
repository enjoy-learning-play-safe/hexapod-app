import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Settings from './pages/Settings';

const Router: React.FC = () => {
  return (
    <Switch>
      <Route path="/settings">
        <Settings />
      </Route>
      <Route path="/debug">
        <div />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default Router;
