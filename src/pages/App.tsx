import { Outlet, ScrollRestoration } from 'react-router-dom';
import AuthProvider from '../core/context/authCtx';
import useAuth from '../core/hooks/useAuth';
import Layout from '../shared/layout/Layout';

const App: React.FC = () => {
  useAuth();

  return (
    <AuthProvider>
      <Layout>
        <Outlet />
        <ScrollRestoration
          getKey={(location) => {
            return location.pathname;
          }}
        />
      </Layout>
    </AuthProvider>
  );
};

export default App;
