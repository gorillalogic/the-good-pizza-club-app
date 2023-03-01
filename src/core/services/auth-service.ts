import { User } from '../../models/User';
import { axiosInstance } from './axios';

export const login = (email: string, password: string) => {
  return axiosInstance.post('/auth/login', { email, password });
};

export const register = (data: User) => {
  return axiosInstance.post('/auth/register', data);
};

export const logout = () => {
  return axiosInstance.post('/auth/logout');
};
