import { createBrowserRouter } from 'react-router-dom';
import { CustomizeDialogProvider } from './core/context/customizeDialogCtx';
import AboutUs from './pages/AboutUs/AboutUs';
import App from './pages/App';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Cart/Checkout/Checkout';
import OrderPlaced from './pages/Cart/OrderPlaced/OrderPlaced';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Welcome from './pages/Login/Welcome/Welcome';
import Menu from './pages/Menu/Menu';
import NotFound from './pages/NotFound/NotFound';
import LoginForm from './shared/components/LoginForm/LoginForm';
import ProtectedRoute from './shared/components/ProtectedRoute/ProtectedRoute';
import RegisterForm from './shared/components/RegisterForm/RegisterForm';

const routes = [
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
      {
        path: '/cart',
        element: <ProtectedRoute />,
        children: [
          {
            path: '',
            element: <Cart />,
            children: [
              {
                index: true,
                element: <Checkout />,
              },
              {
                path: 'order-placed',
                element: <OrderPlaced />,
              },
            ],
          },
        ],
      },
      {
        path: '/about-us',
        element: <AboutUs />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
export { routes };
