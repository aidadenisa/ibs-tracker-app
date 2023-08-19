import api from '@/lib/api';
import { Category } from '@/types';
import { API_URL } from '@/config';

const BASE_URL = API_URL + '/categories';

const getCategoriesWithEvents = async (): Promise<Category[]> => {
  return (await api.get(BASE_URL + '?populate=true')).data;
}

export default {
  getCategoriesWithEvents
}