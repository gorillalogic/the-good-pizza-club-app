import { createBrowserRouter } from 'react-router-dom';
import App from './pages/App';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Menu from './pages/Menu/Menu';
import Welcome from './pages/Login/Welcome/Welcome';
import NotFound from './pages/NotFound/NotFound';
import LoginForm from './shared/components/LoginForm/LoginForm';
import ProtectedRoute from './shared/components/ProtectedRoute/ProtectedRoute';
import RegisterForm from './shared/components/RegisterForm/RegisterForm';
import { CustomizeDialogProvider } from './core/context/customizeDialogCtx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <Login />,
        children: [
          {
            path: '/',
            element: <Welcome />,
          },
          {
            path: '/login',
            element: <LoginForm />,
          },
          {
            path: '/register',
            element: <RegisterForm />,
          },
        ],
      },
      {
        path: '/home',
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: (
              <CustomizeDialogProvider>
                <Home />
              </CustomizeDialogProvider>
            ),
          },
        ],
      },
      {
        path: '/menu',
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: (
              <CustomizeDialogProvider>
                <Menu />
              </CustomizeDialogProvider>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
