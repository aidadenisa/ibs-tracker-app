import axios, { AxiosError } from 'axios';
import userService from './user';
import store from '../store';
import { setUserInfo } from '../reducers/user';
import { redirect } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_URL + '/auth';

const login = async (email: string, password: string) => {
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
    if(axios.isAxiosError(err)) {
      const { response : error } = err;
      if(error) {
        throw new Error(`There has been an error logging in. ${ error }`);
      }
    } else if (err instanceof Error) {
      throw new Error(`There has been an error logging in. ${ err.message }`);
    }
    return;
  }
}

const authRedirect = async () => {
  const token = localStorage.getItem('token');
  if (!token || !token.length) {
    return redirect('/login');
  }
  try {
    const userInfo = await userService.getCurrentUserInfo();
    store.dispatch(setUserInfo(userInfo));
  } catch(err) {
    console.error(err);
    return redirect('/login');
  }
  return null;
}

export default {
  login,
  authRedirect,
}