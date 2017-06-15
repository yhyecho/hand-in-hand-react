import axios from 'axios';
import { config } from '../../config';
import { browserHistory } from 'react-router';

function handleError(error) {
  if (error.response) {
    console.log(error.response.data.msg);
  } else {
    console.log(error);
  }
}

export function setCurrentUser(user) {
  return {
    type: 'AUTH_USER',
    user
  };
}

export function login(data) {
  return dispatch => {
    axios.post(`${config.host}/auth/login`, data)
      .then(response => {
        const token = response.data.token;
        const user = response.data.user;
        sessionStorage.setItem('jwtToken', token);
        sessionStorage.setItem('user', JSON.stringify(user));
        dispatch(setCurrentUser(user));
        browserHistory.push('/');
        console.log(response.data.msg);
      }).catch(error => {
        handleError(error);
      });
  }
}

export function logout() {
  return dispatch => {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('user');
    dispatch(setCurrentUser({}));
    browserHistory.push('/');
  }
}

export function signup(data) {
  return dispatch => {
    axios.post(`${config.host}/auth/signup`, data)
      .then(response => {
        const token = response.data.token;
        const user = response.data.user;
        sessionStorage.setItem('jwtToken', token);
        sessionStorage.setItem('user', JSON.stringify(user));
        dispatch(setCurrentUser(user));
        browserHistory.push('/');
        console.log(response.data.msg);
      }).catch(error => {
        handleError(error);
      });
  }
}
