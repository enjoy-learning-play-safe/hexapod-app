import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import AxisConfig from './pages/AxisConfig';
import Control from './pages/Control/Control';
import Home from './pages/Home';
import Settings from './pages/Settings';

const Router: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    console.log('router pathname', pathname);
  }, [pathname]);

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/control">
        <Control />
      </Route>
      <Route path="/axis-config">
        <AxisConfig />
      </Route>
      <Route path="/debug">
        <div />
      </Route>
      <Route path="/settings">
        <Settings />
      </Route>
      <Route path="*">
        <Home />
      </Route>
    </Switch>
  );
};

export default Router;
