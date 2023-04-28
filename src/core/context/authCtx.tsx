import { createContext, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User } from '../../models/User';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { logoutAsync } from '../store/slices/auth/asyncThunks';
import authSelectors from '../store/slices/auth/selectors';
import { resetCart } from '../store/slices/cart';
import { resetUser } from '../store/slices/user';

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
  const user = useSelector(authSelectors.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    dispatch(logoutAsync());
    dispatch(resetCart());
    dispatch(resetUser());
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
