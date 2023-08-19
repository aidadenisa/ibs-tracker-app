import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

const getRequestConfig = (): AxiosRequestConfig => {
  const headers: AxiosRequestHeaders = {} as AxiosRequestHeaders;
  const token = localStorage.getItem('token');
  if(token) {
    headers.Authorization = `Bearer ${token}` 
  } 
  return { headers };
}

export {
  getRequestConfig
}