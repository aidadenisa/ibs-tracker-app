import axios from 'axios';
import { getRequestConfig } from '@/utils/api';
import { Category } from '@/types';
import { API_URL } from '@/config';

const BASE_URL = API_URL + '/categories';

const getCategoriesWithEvents = async (): Promise<Category[]> => {
  return (await axios.get(BASE_URL + '?populate=true', getRequestConfig())).data;
}

export default {
  getCategoriesWithEvents
}