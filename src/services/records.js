import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_URL + '/records';

const getRecords = async (id) => {
  return (await axios.get(`${BASE_URL}/${id}`)).data;
}

const createRecord = async (newRecord) => {
  return (await axios.post(BASE_URL, newRecord)).data;
}

export default {
  getRecords, 
  createRecord,
}