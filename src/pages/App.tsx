import { Outlet, ScrollRestoration } from 'react-router-dom';
import { CustomizeDialogProvider } from '../core/context/customizeDialogCtx';
import useAuth from '../core/hooks/useAuth';
import Layout from '../shared/layout/Layout';

const App: React.FC = () => {
  useAuth();

  return (
    <Layout>
      <CustomizeDialogProvider>
        <Outlet />
        <ScrollRestoration
          getKey={(location) => {
            return location.pathname;
          }}
        />
      </CustomizeDialogProvider>
    </Layout>
  );
};

export default App;
