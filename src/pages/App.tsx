
import { Outlet } from 'react-router-dom';
import useAuth from '../core/hooks/useAuth';
import Layout from '../shared/layout/Layout';

const App: React.FC = () => {
  useAuth();

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default App;
