import { createBrowserRouter } from 'react-router-dom';
import App from './pages/App';
import Login from './pages/Login/Login';
import Welcome from './pages/Login/Welcome/Welcome';
import NotFound from './pages/NotFound/NotFound';
import LoginForm from './shared/components/LoginForm/LoginForm';
import RegisterForm from './shared/components/RegisterForm/RegisterForm';

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
    ],
  },
]);

export default router;
