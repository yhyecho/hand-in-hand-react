export default (state = {}, action = {}) => {
  switch (action.type) {
    case 'LOAD_POST':
      return action.post;
    default:
      return state;
  }
}
