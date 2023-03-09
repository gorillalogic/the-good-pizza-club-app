import { axiosInstance } from './axios';

export const getRecords = () => {
  return axiosInstance.get('/records');
};
