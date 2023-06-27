import axios, { AxiosResponse } from 'axios';
import { getRequestConfig } from './utils';
import { User } from '../types';

const BASE_URL = process.env.REACT_APP_API_URL + '/users';

const getCurrentUserInfo = async (): Promise<User> => {
  const config = getRequestConfig();
  try {
    const result = await axios.get(`${BASE_URL}/currentUser?populate=true`, config)
    return result ? result.data : null;
  } catch(err) {
    throw new Error(`There has been a problem retrieving user's data`);
  }
}

export default {
  getCurrentUserInfo
}