import { useMutation, useQuery } from '@tanstack/react-query';
import type { TelegramUser } from '../types/telegram';
import type { PatchNamePayload, PatchOrgPayload } from '../types/api/organization';
import { getRole, getName, patchName, getOrganization, patchOrganization } from '../api/organization';
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
export function useOrgDesc(user: TelegramUser | undefined) {
  return useQuery({
    queryKey: ['org_desc', user?.id],
    queryFn: () => getOrganization(user!),
    enabled: !!user,
    refetchOnWindowFocus: false,
  });
}

export function usePatchOrg(user: TelegramUser | undefined) {
  return useMutation({
    mutationFn: ({ user, organization_description, organization_name }: PatchOrgPayload) => {
      return patchOrganization(user, organization_description, organization_name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['org_desc', user?.id],
      });
    },
  });
}
