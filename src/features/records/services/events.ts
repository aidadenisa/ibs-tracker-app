import axios from 'axios'
import { getRequestConfig } from '@/utils/api';
import { API_URL } from '@/config';

const BASE_URL = API_URL + '/events';

const getEvents = async (): Promise<Event> => {
  const config = getRequestConfig();
  return (await axios.get(BASE_URL, config)).data;
}

export default {
  getEvents,
}