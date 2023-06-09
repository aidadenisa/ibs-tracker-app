import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_URL + '/auth';

const login = async (email, password) => {
  const credentials = {
    email: email,
    pass: password,
  }; 

  const result = await axios.post(`${BASE_URL}/login`, credentials)
    .catch(error => {
      alert(`There has been an error logging in. ${error.error}`)
    });
  
  if(result && result.data && result.data.token) {
    localStorage.setItem('token', result.data.token);
  }
  console.log(localStorage.getItem('token'));

  return result;
}

export default {
  login,
}