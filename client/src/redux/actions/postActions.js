import axios from 'axios';
import { browserHistory } from 'react-router';
import { config } from '../../config';

function handleError(error) {
  if (error.response) {
    console.log(error.response.data.msg);
  } else {
    console.log(error);
  }
}

export function newPost(data) {
  return function(dispatch) {
    axios.post(`${config.host}/posts`, data, {
      headers: {'Authorization': sessionStorage.getItem('jwtToken')}
    }).then(response => {
      dispatch({ type: 'ADD_POST', post: response.data.post })
      browserHistory.push('/dashboard');
      console.log(response.data.msg);
    }).catch(error => {
      handleError(error);
    });
  }
}

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${config.host}/posts`)
      .then(response => {
        dispatch({ type: 'LOAD_POSTS', posts: response.data.posts });
      }).catch(error => {
        handleError(error);
      });
  }
}
