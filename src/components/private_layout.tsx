import { Outlet } from 'react-router';
import Header from './header';
import Layout from './layout';
import Navigation from './navigation';
import type { UserContext } from '../types/user';
import { useName } from '../hooks/useUser';
import { useTelegramUser } from '../store';
function PrivateLayout() {
  const user = useTelegramUser();
  const { data: nameData, isLoading: nameLoading } = useName(user);
  if (nameLoading) return;
  return (
    <Layout>
      <Header orgName={nameData} />
      <Navigation />
      <Outlet context={{ orgName: nameData } satisfies UserContext} />
    </Layout>
  );
}

export default PrivateLayout;
