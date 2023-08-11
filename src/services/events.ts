import axios from 'axios'
import { getRequestConfig } from '@/services/utils';

const BASE_URL = process.env.REACT_APP_API_URL + '/events';

const getEvents = async (): Promise<Event> => {
  const config = getRequestConfig();
  return (await axios.get(BASE_URL, config)).data;
}

export default {
  getEvents,
}