import axios, { AxiosError } from 'axios';
import { LOCALSTORAGE_KEYS } from '../../shared/constants/global.constants';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
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
    const { response } = error as AxiosError;

    if (response?.status === 403) {
      localStorage.removeItem(LOCALSTORAGE_KEYS.user);
      window.location.replace('/');
    }

    return Promise.reject(error);
  }
);
