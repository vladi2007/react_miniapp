import { useQuery } from '@tanstack/react-query';
import type { TelegramUser } from '../types/telegram';
import { getRole, getName } from '../api/organization';

export function useUser(user: TelegramUser | undefined) {
  return useQuery({
    queryKey: ['role', user?.id],
    queryFn: () => getRole(user!),
    enabled: !!user,
    refetchOnWindowFocus: false,
  });
}

export function useName(user: TelegramUser | undefined) {
  return useQuery({
    queryKey: ['org_name', user?.id],
    queryFn: () => getName(user!),
    enabled: !!user,
    refetchOnWindowFocus: false,
  });
}
