import api from '@/lib/api';
import { API_URL } from '@/config';

const BASE_URL = API_URL + '/events';

const getEvents = async (): Promise<Event[]> => {
  return (await api.get(BASE_URL)).data;
}

export default {
  getEvents,
}