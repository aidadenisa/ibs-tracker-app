import axios from 'axios';
import { Dictionary } from '@reduxjs/toolkit';
import store from '@/store';
import { NewRecord, User, UserRecord } from '@/types';
import { areSameDays, getRequestConfig } from '@/services/utils';
import userService from '@/services/user';
import { setSelectedEventsIds } from '@/reducers/events';

const BASE_URL = process.env.REACT_APP_API_URL + '/records';

const getRecords = async (id: string): Promise<UserRecord> => {
  const config = getRequestConfig();
  return (await axios.get(`${BASE_URL}/${id}`, config)).data;
}

const createRecord = async (newRecord: NewRecord) => {
  const config = getRequestConfig();
  return (await axios.post(BASE_URL, newRecord, config)).data;
}

const saveNewRecords = async () => {
  const { selectedEventsIds } = store.getState();
  if(selectedEventsIds === undefined || Object.keys(selectedEventsIds).length === 0) {
    return;
  }
  
  const config = getRequestConfig();
  const { currentDay } = store.getState();

  const result = await axios.post(`${BASE_URL}/multiple`, {
    dateISO: currentDay,
    selectedEventsIds: Object.keys(selectedEventsIds).filter(key => selectedEventsIds[key])
  }, config);

  if(result && result.status === 200) {
    await userService.updateCurrentUserInfo();
  }
  return;
}

const updateRecordsForCurrentDay = (userInfo: User) => {
  const currentDay = store.getState().currentDay;

  const selectedEventsIdsArray = userInfo.records && !!userInfo.records.length
    ? userInfo.records.filter(
      record => areSameDays(new Date(record.date), new Date(currentDay))
    ).map(record => record.event)
    : [];
  const selectedEventsIds: Dictionary<boolean> = {};
  for (let i = 0; i < selectedEventsIdsArray.length; i++) {
    selectedEventsIds[selectedEventsIdsArray[i]] = true
  }
  store.dispatch(setSelectedEventsIds(selectedEventsIds));
}


export default {
  getRecords, 
  createRecord,
  saveNewRecords,
  updateRecordsForCurrentDay
}