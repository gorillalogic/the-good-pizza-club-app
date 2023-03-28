import { axiosInstance } from './axios';

export const getPayments = () => {
  return axiosInstance.get('/users/payment');
};

export const getAddresses = () => {
  return axiosInstance.get('/users/address');
};
