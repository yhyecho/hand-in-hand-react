import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App';
import LogIn from './components/LogIn';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export const renderRoutes = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path='/login' component={LogIn}/>
      </Route>
    </Router>
  </Provider>
);
