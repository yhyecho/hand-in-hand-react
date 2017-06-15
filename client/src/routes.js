import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App';
import LogIn from './components/LogIn';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { setCurrentUser } from './redux/actions/authActions';

if (sessionStorage.jwtToken) {
  const user = JSON.parse(sessionStorage.user);
  store.dispatch(setCurrentUser(user));
}

export const renderRoutes = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path='/login' component={LogIn}/>
      </Route>
    </Router>
  </Provider>
);
