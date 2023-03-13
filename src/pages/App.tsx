import { Outlet, ScrollRestoration } from 'react-router-dom';
import useAuth from '../core/hooks/useAuth';
import Layout from '../shared/layout/Layout';

const App: React.FC = () => {
  useAuth();

  return (
    <Layout>
      <Outlet />
      <ScrollRestoration
        getKey={(location) => {
          return location.pathname;
        }}
      />
    </Layout>
  );
};

export default App;
