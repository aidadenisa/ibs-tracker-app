import Axios, { InternalAxiosRequestConfig } from 'axios';
import tokenService from '@/services/token';
import { API_URL } from '@/config';
/* eslint-disable  @typescript-eslint/no-explicit-any */

// Interceptor of requests
// You can use it to set the auth token on requests, log out unauthorized users, send new requests for refreshing tokens.
const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  if (tokenService.hasToken()) {
    config.headers.Authorization = `Bearer ${tokenService.getToken()}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

const successResponseInterceptor = (response: any) => {
  return response;
}

// Set up an interceptor for handling errors. 
// You can use it to fire a notification toast to notify users that something went wrong, log out unauthorized users, or send new requests for refreshing tokens.
const errorResponseInterceptor = (error: any) => {
  // set a notification with the error
  // const message = error.response?.data?.message || error.message;
  // useNotificationStore.getState().addNotification({
  //   type: 'error',
  //   title: 'Error',
  //   message,
  // });

  if(error.response?.status === 500) {
    alert('A server error occurred. Please try again later.');
  }

  return Promise.reject(error);
}

const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(successResponseInterceptor, errorResponseInterceptor);

const get = (url: string): Promise<any> => {
  
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
}

const post = (url: string, payload?: any): Promise<any> => {
  
  return new Promise((resolve, reject) => {
    axios.post(url, payload)
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