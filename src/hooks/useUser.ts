import { useQuery } from '@tanstack/react-query';
import type { TelegramUser } from '../types/telegram';
import { getRole } from '../api/user';

export function useUser(user: TelegramUser | undefined) {
  return useQuery({
    queryKey: ['role', user?.id],
    queryFn: () => getRole(user!),
    enabled: !!user,
    refetchOnWindowFocus: false,
  });
}
