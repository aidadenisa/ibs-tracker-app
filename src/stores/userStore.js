import { createStore } from 'redux';

const userReducer = (state, action) => {
  if(action.type === 'LOG_USER') {
    return action.payload;
  }
  return state;
}

const store = createStore(userReducer);

export default store;