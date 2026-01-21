// layouts/EmptyLayout.tsx
import { Outlet } from 'react-router-dom';
import Layout from './layout';
function EmptyLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default EmptyLayout;
