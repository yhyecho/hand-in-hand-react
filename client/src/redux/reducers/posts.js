import map from 'lodash/fp/map';

export default (state =[], action = {}) => {
  switch (action.type) {
    case 'ADD_POST':
      return [...state, action.post];
    case 'LOAD_POSTS':
      return action.posts;
    case 'EDIT_POST':
      return map((post, index) => {
        if (post._id === action.post._id) {
          return action.post
        } else {
          return post
        }
      }, state)
    default:
      return state;
  }
}
