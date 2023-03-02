import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:7777/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});
