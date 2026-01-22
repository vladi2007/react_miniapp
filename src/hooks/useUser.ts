import { useMutation, useQuery } from '@tanstack/react-query';
import type { TelegramUser } from '../types/telegram';
import type { PatchNamePayload } from '../types/api/organization';
import { getRole, getName, patchName } from '../api/organization';
import { queryClient } from '../main';

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

export function usePatchName(user: TelegramUser | undefined) {
  return useMutation({
    mutationFn: ({ user, name }: PatchNamePayload) => {
      return patchName(user, name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['org_name', user?.id],
      });
    },
  });
}
