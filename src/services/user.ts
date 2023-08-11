import axios from 'axios';
import { User } from '@/types';
import store from '@/store';
import { getRequestConfig } from '@/services/utils';
import recordService from '@/services/records';
import { setUserInfo } from '@/reducers/user';
import { API_URL } from '@/config';

const BASE_URL = API_URL + '/users';

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