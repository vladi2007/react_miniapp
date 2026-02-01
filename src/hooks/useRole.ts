import { useDispatch } from 'react-redux';
import { useTelegramUser, useUserRole, type AppDispatch } from '../store';
import { useEffect } from 'react';
import { useUser } from './useUser';
import { setRole } from '../features/role/roleSlice';
import type { UserRole } from '../types/api/organization';

export function useRole() {
  const dispatch = useDispatch<AppDispatch>();
  const role = useUserRole();
  const user = useTelegramUser();
  const { data: roleData, isLoading: roleLoading } = useUser(user);

  useEffect(() => {
    if (user && roleData) dispatch(setRole(roleData as UserRole));
  }, [user, roleData]);

  if (!user || roleLoading || !role) return undefined;
  return { role };
}
