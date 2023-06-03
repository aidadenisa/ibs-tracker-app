import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_URL + '/records';

const getRecords = (id) => {
  return axios.get(`${BASE_URL}/${id}`);
}

const createRecord = async (newRecord) => {
  return axios.post(BASE_URL, newRecord);
}

export default {
  getRecords, 
  createRecord,
}