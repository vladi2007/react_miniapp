import { Outlet } from 'react-router';
import { useUserContext } from '../App';
import Header from './header';
import Layout from './layout';
import Navigation from './navigation';
import type { UserContext } from '../types/user';
function PrivateLayout() {
  const context = useUserContext();
  return (
    <Layout>
      <Header user={context.user} orgName={context.orgName} />
      <Navigation />
      <Outlet context={{ user: context.user, role: context.role, orgName: context.orgName } satisfies UserContext} />
    </Layout>
  );
}

export default PrivateLayout;
