import axios from 'axios'
const BASE_URL = process.env.REACT_APP_API_URL + '/events';

const getEvents = () => {
  return axios.get(BASE_URL);
}

export default {
  getEvents,
}