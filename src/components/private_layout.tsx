import { Outlet } from 'react-router';
import { useUserContext } from '../App';
import Header from './header';
import Layout from './layout';
import Navigation from './navigation';

function PrivateLayout() {
  const context = useUserContext();
  return (
    <Layout>
      <Header user={context.user} orgName={context.orgName} />
      <Navigation />
      <Outlet />
    </Layout>
  );
}

export default PrivateLayout;
