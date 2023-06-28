import axios, { AxiosResponse } from 'axios';
import { getRequestConfig, isTimestampPartOfASpecificDate } from './utils';
import { User } from '../types';
import store from '../store';
import { setUserInfo } from '../reducers/user';
import { Dictionary } from '@reduxjs/toolkit';
import { setSelectedEventsIds } from '../reducers/events';

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

  const selectedEventsIdsArray = userInfo.records && !!userInfo.records.length
    ? userInfo.records.filter(
      record => isTimestampPartOfASpecificDate(record.date, new Date())
    ).map(record => record.event)
    : [];
  const selectedEventsIds: Dictionary<boolean> = {};
  for (let i = 0; i < selectedEventsIdsArray.length; i++) {
    selectedEventsIds[selectedEventsIdsArray[i]] = true
  }
  store.dispatch(setSelectedEventsIds(selectedEventsIds));
  return;
}

export default {
  getCurrentUserInfo,
  updateCurrentUserInfo
}