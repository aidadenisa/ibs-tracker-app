import axios from 'axios';
import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import tokenService from '@/services/token';
/* eslint-disable  @typescript-eslint/no-explicit-any */

const getRequestConfig = (): AxiosRequestConfig => {
  const headers: AxiosRequestHeaders = {} as AxiosRequestHeaders;
  const token = tokenService.getToken();
  if (tokenService.hasToken()) {
    headers.Authorization = `Bearer ${token}`;
  }
  return { headers };
}

const get = (url: string, config?: any): Promise<any> => {
  const requestConfig = config ? config : getRequestConfig();
  
  return new Promise((resolve, reject) => {
    axios.get(url, requestConfig)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
}

const post = (url: string, payload?: any, config?: any): Promise<any> => {
  const requestConfig = config ? config : getRequestConfig();
  
  return new Promise((resolve, reject) => {
    axios.post(url, payload, requestConfig)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
}

export default {
  get,
  post,
}