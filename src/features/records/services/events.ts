import api from '@/lib/api';

const BASE_URL = '/events';

const getEvents = async (): Promise<Event[]> => {
  return (await api.get(BASE_URL)).data;
}

export default {
  getEvents,
}