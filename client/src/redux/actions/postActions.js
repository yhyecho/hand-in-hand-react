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
  let formData = new FormData();
  formData.append('name', data.name);
  formData.append('content', data.content);
  formData.append('post', data.file);
  return function(dispatch) {
    axios.post(`${config.host}/posts`, formData, {
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

export function getPost(id) {
  return (dispatch) => {
    axios.get(`${config.host}/posts/${id}`)
      .then(response => {
        dispatch({ type: 'LOAD_POST', post: response.data.post });
      }).catch(error => {
        handleError(error);
      });
  }
}

export function clearPost() {
  return { type: 'CLEAR_POST' }
}

export function editPost(data, id) {
  let formData = new FormData();
  formData.append('name', data.name);
  formData.append('content', data.content);
  formData.append('post', data.file);
  return (dispatch) => {
    axios.put(`${config.host}/posts/${id}`, formData, {
      headers: {'Authorization': sessionStorage.getItem('jwtToken')}
    }).then(response => {
      dispatch({ type: 'EDIT_POST', post: response.data.post })
      browserHistory.push('/dashboard');
      console.log(response.data.msg);
    }).catch(error => {
      handleError(error);
    });
  }
}
