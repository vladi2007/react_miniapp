import { Outlet } from 'react-router';
import { useUserContext } from '../App';
import Header from './header';
import Layout from './layout';
import Navigation from './navigation';
import type { UserContext } from '../types/user';
import { useName } from '../hooks/useUser';
function PrivateLayout() {
  const context = useUserContext();
  const { data: nameData, isLoading: nameLoading } = useName(context?.user);
  if (nameLoading) return;
  return (
    <Layout>
      <Header user={context.user} orgName={nameData} />
      <Navigation />
      <Outlet context={{ user: context.user, role: context.role, orgName: nameData } satisfies UserContext} />
    </Layout>
  );
}

export default PrivateLayout;
