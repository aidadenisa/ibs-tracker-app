const getToken = () => {
  return localStorage.getItem('token');
}

const hasToken = () => {
  const token = getToken();
  return token && token.length;
}

const setToken = (token: string) => {
  localStorage.setItem('token', token);
}

export default {
  hasToken,
  getToken,
  setToken,
}