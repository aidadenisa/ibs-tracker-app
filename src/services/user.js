import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_URL + '/users';

const getCurrentUserInfo = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }

  const result = await axios.get(`${BASE_URL}/currentUser`, config)
    .catch(err => console.error(err))
  return result.data;
}

export default {
  getCurrentUserInfo
}