import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:7777/',
  headers: {
    'Content-Type': 'application/json',
  },
});
