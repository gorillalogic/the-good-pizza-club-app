import { Address } from '../../models/Address';
import { Payment } from '../../models/Payment';
import { axiosInstance } from './axios';

export const getPayments = () => {
  return axiosInstance.get('/users/payment');
};

export const createPayament = (data: Partial<Payment>) => {
  return axiosInstance.post('/users/payment', data);
};

export const deletePayment = (id: number) => {
  return axiosInstance.delete(`/users/payment/${id}`);
};

export const createAddress = (data: Partial<Address>) => {
  return axiosInstance.post('/users/address', data);
};

export const getAddresses = () => {
  return axiosInstance.get('/users/address');
};

export const deleteAddress = (id: number) => {
  return axiosInstance.delete(`/users/address/${id}`);
};
