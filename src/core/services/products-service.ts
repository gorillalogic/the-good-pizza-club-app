import { axiosInstance } from './axios';

export const getProducts = () => {
  return axiosInstance.get('/products');
};
