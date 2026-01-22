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
