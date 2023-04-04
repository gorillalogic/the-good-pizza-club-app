import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import authSelectors from '../../../core/store/slices/auth/selectors';

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isLoggedIn = useSelector(authSelectors.loggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
