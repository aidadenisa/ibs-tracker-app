import axios from 'axios';
import { getRequestConfig } from './utils';
import { NewRecord, UserRecord } from '../types';
import store from '../store';
import userService from './user';
import { setUserInfo } from '../reducers/user';
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
  const config = getRequestConfig();
  const { selectedEventsIds } = store.getState();
  // TODO: REPLACE THIS WITH CURRENT ACTIVE DATE
  const date = new Date();

  const result = await axios.post(`${BASE_URL}/multiple`, {
    dateISO: date.toISOString(),
    selectedEventsIds: Object.keys(selectedEventsIds).filter(key => selectedEventsIds[key])
  }, config);
  
  if(result && result.status === 200) {
    const result = await userService.getCurrentUserInfo();
    store.dispatch(setUserInfo(result));
  }
  return;
}


export default {
  getRecords, 
  createRecord,
  saveNewRecords,
}