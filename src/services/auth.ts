import axios from 'axios';
import { redirect } from 'react-router-dom';
import { AuthInput } from '@/types';
import userService from '@/services/user';

const BASE_URL = process.env.REACT_APP_API_URL + '/auth';

const login = async (email: string) => { 
  try {
    const result = await axios.post(`${BASE_URL}/login`, { email })
    if(result && result.status === 200) {
      return result;
    }
    return;
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

const validateOTP = async (authInput: AuthInput) => {
  try {
    const result = await axios.post(`${BASE_URL}/validate-otp`, authInput);
    if(result && result.status === 200 && result.data && result.data.token) {
      localStorage.setItem('token', result.data.token);
    }
    console.log(localStorage.getItem('token'));
    await userService.updateCurrentUserInfo();
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
  }
}

const authRedirect = async () => {
  const token = localStorage.getItem('token');
  if (!token || !token.length) {
    return redirect('/login');
  }
  try {
    await userService.updateCurrentUserInfo();
  } catch(err) {
    console.error(err);
    return redirect('/login');
  }
  return null;
}

export default {
  login,
  validateOTP,
  authRedirect,
}