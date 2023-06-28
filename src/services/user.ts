import axios from 'axios';
import { getRequestConfig } from './utils';
import { User } from '../types';
import store from '../store';
import { setUserInfo } from '../reducers/user';
import recordService from '../services/records';

const BASE_URL = process.env.REACT_APP_API_URL + '/users';

const getCurrentUserInfo = async (): Promise<User> => {
  const config = getRequestConfig();
  try {
    const result = await axios.get(`${BASE_URL}/currentUser?populate=true`, config)
    return result ? result.data : null;
  } catch (err) {
    throw new Error(`There has been a problem retrieving user's data`);
  }
}

const updateCurrentUserInfo = async (): Promise<void> => {
  // TODO: REPLACE NEW DATE WITH APPLICATION CURRENT DATE FROM STORE
  const userInfo = await getCurrentUserInfo();
  store.dispatch(setUserInfo(userInfo));

  recordService.updateRecordsForCurrentDay(userInfo);
  return;
}

export default {
  getCurrentUserInfo,
  updateCurrentUserInfo
}