import api from '@/lib/api';
import { Category } from '@/types';

const BASE_URL = '/categories';

const getCategoriesWithEvents = async (): Promise<Category[]> => {
  return (await api.get(BASE_URL + '?populate=true')).data;
}

export default {
  getCategoriesWithEvents
}