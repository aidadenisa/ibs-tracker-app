import axios from 'axios';
import userService from '../services/user';
import store from '../store';
import { setUserInfo } from '../reducers/user';
import { redirect } from 'react-router-dom';

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
    store.dispatch(setUserInfo(userInfo));

    return result;
  } catch(err) {
    const { response : { data : { error } } } = err;
    if(error || error.length) {
      return { error: `There has been an error logging in. ${ error }` };
    }
  }
  return;
}

const authRedirect = async () => {
  const token = localStorage.getItem('token');
  if (!token || !token.length) {
    return redirect('/login');
  }
  const userInfo = await userService.getCurrentUserInfo();
  store.dispatch(setUserInfo(userInfo));
  return null;
}

export default {
  login,
  authRedirect,
}