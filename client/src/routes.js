import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App';
import LogIn from './components/LogIn';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='/login' component={LogIn}/>
    </Route>
  </Router>
);
