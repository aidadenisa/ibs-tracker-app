import axios from 'axios';
import { getHeadersConfig } from './utils';

const BASE_URL = process.env.REACT_APP_API_URL + '/records';

const getRecords = async (id) => {
  const config = getHeadersConfig();
  return (await axios.get(`${BASE_URL}/${id}`, config)).data;
}

const createRecord = async (newRecord) => {
  const config = getHeadersConfig();
  return (await axios.post(BASE_URL, newRecord, config)).data;
}

export default {
  getRecords, 
  createRecord,
}