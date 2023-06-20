import axios from 'axios';
import { getRequestConfig } from './utils';
import { Category } from '../types';

const BASE_URL = process.env.REACT_APP_API_URL + '/categories';

const getCategoriesWithEvents = async (): Promise<Category[]> => {
  return (await axios.get(BASE_URL + '?populate=true', getRequestConfig())).data;
}

export default {
  getCategoriesWithEvents
}