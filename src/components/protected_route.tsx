import { Navigate, Outlet } from 'react-router';
import { useUserContext } from '../App';

import type { TelegramUser } from '../types/telegram';
interface UserContext {
  user?: TelegramUser;
  role?: string;
}

function ProtectedRoute() {
  const context = useUserContext();
  if (context.role && context.role === 'organizer') return <Outlet context={{ user: context.user, role: context.role } satisfies UserContext} />;
  else return <Navigate to="/not_access" />;
}

export default ProtectedRoute;
