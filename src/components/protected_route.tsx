import { Navigate, Outlet } from 'react-router';
import { useUserRole } from '../store';
function ProtectedRoute() {
  const role = useUserRole();

  if (!role) return <div>Loading...</div>;

  if (role !== 'organizer') {
    return <Navigate to="/not_access" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
