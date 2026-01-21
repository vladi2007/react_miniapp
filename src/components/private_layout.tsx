import { Navigate, Outlet } from 'react-router';
import { useUserContext } from '../App';
import Header from './header';
import Layout from './layout';
import Navigation from './navigation';

function PrivateLayout() {
  const context = useUserContext();
  console.log(context);

  if (context.role !== 'organizer') return <Navigate to="not_access" />;
  return (
    <Layout>
      <Header user={context.user} />
      <Navigation />
      <Outlet />
    </Layout>
  );
}

export default PrivateLayout;
