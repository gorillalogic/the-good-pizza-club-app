import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import {
  COOKIE_SESSION_NAME,
  LOCALSTORAGE_KEYS,
} from '../../shared/constants/global.constants';
import { setUser } from '../store/slices/auth';
import { useAppDispatch } from './useAppDispatch';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const [cookies, , removeCookie] = useCookies();
  const sessionCookie = cookies[COOKIE_SESSION_NAME];
  const localUser = localStorage.getItem(LOCALSTORAGE_KEYS.user);

  useEffect(() => {
    if (localUser && sessionCookie) {
      dispatch(setUser(JSON.parse(localUser)));
    }

    if (localUser && !sessionCookie) {
      localStorage.removeItem(LOCALSTORAGE_KEYS.user);
    }

    if (!localUser && sessionCookie) {
      removeCookie(COOKIE_SESSION_NAME);
    }
  }, [localUser, sessionCookie]);
};

export default useAuth;
