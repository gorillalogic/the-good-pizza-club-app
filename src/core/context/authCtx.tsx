import { createContext, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User } from '../../models/User';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { logoutAsync } from '../store/slices/auth/asyncThunks';
import { getUser } from '../store/slices/auth/selectors';

interface AuthContext {
  user: Partial<User> | null;
  logout: () => void;
}

const authContext = createContext<AuthContext>({
  user: null,
  logout: () => {
    //
  },
});

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const user = useSelector(getUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    dispatch(logoutAsync());
    navigate('/', { replace: true });
  }, []);

  return (
    <authContext.Provider value={{ user, logout }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
export { authContext };
