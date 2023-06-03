import axios from 'axios'
const BASE_URL = process.env.REACT_APP_API_URL + '/events';

const getEvents = async () => {
  return (await axios.get(BASE_URL)).data;
}

export default {
  getEvents,
}