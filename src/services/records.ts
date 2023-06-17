import axios from 'axios';
import { getRequestConfig } from './utils';
import { NewRecord, UserRecord } from '../types';

const BASE_URL = process.env.REACT_APP_API_URL + '/records';

const getRecords = async (id: string): Promise<UserRecord> => {
  const config = getRequestConfig();
  return (await axios.get(`${BASE_URL}/${id}`, config)).data;
}

const createRecord = async (newRecord: NewRecord) => {
  const config = getRequestConfig();
  return (await axios.post(BASE_URL, newRecord, config)).data;
}

export default {
  getRecords, 
  createRecord,
}