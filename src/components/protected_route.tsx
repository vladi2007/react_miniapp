import { Navigate, Outlet, useOutletContext } from 'react-router';
import type { UserContext } from '../types/user';
import { useUser } from '../hooks/useUser';
function ProtectedRoute() {
  const context = useUserContext();
  const { data: role, isLoading: roleLoading } = useUser(context.user);
  if (roleLoading) return;
  if (!role || role !== 'organizer') return <Navigate to="/not_access" />;
  else return <Outlet context={{ user: context.user, role: role } satisfies UserContext} />;
}
export function useUserContext() {
  return useOutletContext<UserContext>();
}
export default ProtectedRoute;
