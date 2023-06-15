import axios from 'axios';
import userService from '../services/user';
import store from '../store';
import { logUser } from '../reducers/user';

const BASE_URL = process.env.REACT_APP_API_URL + '/auth';

const login = async (email, password) => {
  const credentials = {
    email: email,
    pass: password,
  }; 

  try {
    const result = await axios.post(`${BASE_URL}/login`, credentials)
    if(result && result.data && result.data.token) {
      localStorage.setItem('token', result.data.token);
    }
    console.log(localStorage.getItem('token'));
    
    const userInfo = await userService.getCurrentUserInfo();
    store.dispatch(logUser(userInfo));

    return result;
  } catch(err) {
    const { response : { data : { error } } } = err;
    if(error || error.length) {
      return { error: `There has been an error logging in. ${ error }` };
    }
  }
  return;
}

export default {
  login,
}