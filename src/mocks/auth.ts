import { AuthState } from '../core/store/slices/auth';
import { User } from '../models/User';

export const MOCK_USER: Partial<User> = {
  id: 0,
  name: 'Juan Lopez',
  email: 'test@test',
  phone: '111111',
};

export const MOCK_AUTH: AuthState = {
  isLoggedIn: true,
  user: MOCK_USER,
};
