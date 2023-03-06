import { axiosInstance } from './axios';

export const getPromotions = () => {
  return axiosInstance.get('/promotions');
};
