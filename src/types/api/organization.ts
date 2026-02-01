import type { TelegramUser } from '../telegram';
export interface organizationName {
  name: string;
  username: string;
  organization_name: string;
  role: string;
}
export interface organizationDescription {
  organization_name: string;
  organization_description: string;
}

export interface PatchNamePayload {
  user: TelegramUser;
  name: string;
}
export interface PatchOrgPayload {
  user: TelegramUser;
  organization_description: string | undefined;
  organization_name: string;
}
export type UserRole = 'admin' | 'leader' | 'organizer' | 'participant';
export type UserRoleToAdd = 'admin' | 'leader';
export type UsersFilter = 'admin' | 'leader' | 'all';
export interface OrganizationParticipant {
  id: number;
  name: string;
  username: string;
  role: UserRole;
  is_you: boolean;
}

export interface OrganizationParticipantsResponse {
  participants: OrganizationParticipant[];
}

export type AddUserPayload = {
  user: TelegramUser | undefined;
  participant_username: string | undefined;
  role: string;
};

export type PatchUserRolePayload = {
  user: TelegramUser | undefined;
  participant_id: number;
  role: string;
};
