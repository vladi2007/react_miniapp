import { Navigate, Outlet } from 'react-router';
import { useUserContext } from '../App';
import type { UserContext } from '../types/user';
function ProtectedRoute() {
  const context = useUserContext();
  if (context.role && context.role === 'organizer')
    return <Outlet context={{ user: context.user, role: context.role, orgName: context.orgName } satisfies UserContext} />;
  else return <Navigate to="/not_access" />;
}

export default ProtectedRoute;
