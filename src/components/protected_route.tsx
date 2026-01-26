import { Navigate, Outlet, useOutletContext } from 'react-router';
import type { UserContext } from '../types/user';
function ProtectedRoute() {
  const context = useUserContext();

  if (context.role && context.role !== 'organizer') return <Navigate to="/not_access" />;
  else return <Outlet context={{ user: context.user, role: context.role } satisfies UserContext} />;
}
export function useUserContext() {
  return useOutletContext<UserContext>();
}
export default ProtectedRoute;
