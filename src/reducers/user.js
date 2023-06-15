const userReducer = (state = {}, action) => {
  if(action.type === 'LOG_USER') {
    return action.payload;
  }
  return state;
}

export default userReducer;

// CREATOR FUNCTIONS

export const logUser = (userInfo = {}) => {
  return {
    type: 'LOG_USER',
    payload: userInfo
  };
}