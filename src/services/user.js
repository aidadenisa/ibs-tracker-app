import axios from 'axios';
import { getHeadersConfig } from './utils';

const BASE_URL = process.env.REACT_APP_API_URL + '/users';

const getCurrentUserInfo = async () => {
  const config = getHeadersConfig();
  const result = await axios.get(`${BASE_URL}/currentUser`, config)
    .catch(err => console.error(err))
  return result.data;
}

export default {
  getCurrentUserInfo
}