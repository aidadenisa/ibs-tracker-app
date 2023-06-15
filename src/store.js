import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/user';

const reducer = combineReducers({
  user: userReducer,
});
const store = createStore(reducer)

// I did this export because sometimes I need to import store in js files 
// This should NOT be done on server side rendering (ssr)
export default store;
