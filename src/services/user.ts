import { User } from '@/types';
import store from '@/store';
import api from '@/lib/api';
import recordService from '@/features/records/services/records';
import { setUserInfo } from '@/reducers/user';
import { API_URL } from '@/config';

const BASE_URL = API_URL + '/users';

const getCurrentUserInfo = async (): Promise<User> => {
  try {
    const result = await api.get(`${BASE_URL}/currentUser?populate=true`)
    return result ? result.data : null;
  } catch (err) {
    throw new Error(`There has been a problem retrieving user's data`);
  }
}

const updateCurrentUserInfo = async (): Promise<void> => {
  const userInfo = await getCurrentUserInfo();
  store.dispatch(setUserInfo(userInfo));

  recordService.updateRecordsForCurrentDay(userInfo);
  return;
}

export default {
  getCurrentUserInfo,
  updateCurrentUserInfo,
}