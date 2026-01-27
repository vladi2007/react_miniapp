import { useMutation, useQuery } from '@tanstack/react-query';
import type { TelegramUser } from '../types/telegram';
import type { AddUserPayload, PatchNamePayload, PatchOrgPayload, PatchUserRolePayload } from '../types/api/organization';
import { getRole, getName, patchName, getOrganization, patchOrganization, getParticipants, postParticipant, patchParticipant } from '../api/organization';
import { queryClient } from '../main';

export function useUser(user: TelegramUser | undefined) {
  return useQuery({
    queryKey: ['role'],
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
      queryClient.invalidateQueries({
        queryKey: ['org_parts', user?.id],
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

export function usePatchOrg() {
  return useMutation({
    mutationFn: ({ user, organization_description, organization_name }: PatchOrgPayload) => {
      return patchOrganization(user, organization_description, organization_name);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['org_desc', variables.user?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['org_name', variables.user?.id],
      });
    },
  });
}
export function useOrgParticipants(user: TelegramUser | undefined, filter: string) {
  return useQuery({
    queryKey: ['org_parts', user?.id, filter],
    queryFn: () => getParticipants(user!, filter!),
    enabled: !!user && !!filter,
    refetchOnWindowFocus: false,
  });
}

export function useAddUser() {
  return useMutation({
    mutationFn: async ({ user, role, participant_username }: AddUserPayload) => {
      return postParticipant(user!, role!, participant_username!);
    },
    onSuccess: (_, variables) => {
      // После успешного POST можно автоматически обновить список участников
      queryClient.invalidateQueries({
        queryKey: ['org_parts', variables?.user?.id, variables.role],
      });
      queryClient.invalidateQueries({
        queryKey: ['org_parts', variables?.user?.id, 'all'],
      });
    },
  });
}

export function usePatchUser() {
  return useMutation({
    mutationFn: async ({ user, role, participant_id }: PatchUserRolePayload) => {
      return patchParticipant(user!, role!, participant_id!);
    },
    onSuccess: (_, variables) => {
      // После успешного POST можно автоматически обновить список участников
      queryClient.invalidateQueries({
        queryKey: ['org_parts', variables?.user?.id, variables.role],
      });
      queryClient.invalidateQueries({
        queryKey: ['org_parts', variables?.user?.id, 'all'],
      });
    },
  });
}
