import { createBrowserRouter } from 'react-router-dom';
import App from './pages/App';
import Home from './pages/Home/Home';
import Landing from './pages/Home/Landing/Landing';
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
        element: <Home />,
        children: [
          {
            path: '/',
            element: <Landing />,
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
