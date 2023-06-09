import axios from 'axios'
import { getHeadersConfig } from './utils';

const BASE_URL = process.env.REACT_APP_API_URL + '/events';

const getEvents = async () => {
  const config = getHeadersConfig();
  return (await axios.get(BASE_URL, config)).data;
}

export default {
  getEvents,
}