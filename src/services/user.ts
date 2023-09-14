import { User } from '@/types';
import api from '@/lib/api';
import recordService from '@/features/records/services/records';

const BASE_URL = '/users';

const getCurrentUserInfo = async (): Promise<User> => {
  try {
    const result = await api.get(`${BASE_URL}/currentUser?populate=true`)
    return result ? result.data : null;
  } catch (err) {
    if(localStorage.getItem('token')) {
      localStorage.removeItem('token');
      window.location.reload();
    }
    throw new Error(`There has been a problem retrieving user's data`);
  }
}

const refreshLoggedInUserData = async (): Promise<User> => {
  const user = await getCurrentUserInfo();
  recordService.updateRecordsState(user.records);
  return user;
}

export default {
  getCurrentUserInfo,
  refreshLoggedInUserData,
}