import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './components/App';
import LogIn from './components/LogIn';
import Home from './components/Home';
import SignUp from './components/SignUp';
import NewPost from './components/posts/NewPost';
import ShowPost from './components/posts/ShowPost';
import DashBoard from './components/DashBoard';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { setCurrentUser } from './redux/actions/authActions';

if (sessionStorage.jwtToken) {
  const user = JSON.parse(sessionStorage.user);
  store.dispatch(setCurrentUser(user));
}

function requireAuth(nextState, replace) {
  if (!isAdmin()) {
    replace('/login')
  }
}

function isAdmin() {
  if (!sessionStorage.getItem('jwtToken') && !sessionStorage.getItem('user')) return false;
  const user = JSON.parse(sessionStorage.getItem('user'));
  return user.admin === true ? true : false
}

export const renderRoutes = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='/login' component={LogIn}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/dashboard' component={DashBoard} onEnter={requireAuth} />
        <Route path='/posts/new' component={NewPost} onEnter={requireAuth} />
        <Route path='/posts/:postId' component={ShowPost} />
      </Route>
    </Router>
  </Provider>
);
