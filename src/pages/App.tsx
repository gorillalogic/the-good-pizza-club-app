import { Outlet } from "react-router-dom";
import Layout from "../shared/layout/Layout";

const App: React.FC = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default App;