import axios, { AxiosError } from 'axios';
import { LOCALSTORAGE_KEYS } from '../../shared/constants/global.constants';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:7777/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    const { response } = error as AxiosError;

    if (!response || response.status === 403) {
      localStorage.removeItem(LOCALSTORAGE_KEYS.user);
    }

    return Promise.reject(error);
  }
);
