import type { TelegramUser } from '../telegram';
export interface organizationName {
  name: string;
  username: string;
  organization_name: string;
  role: string;
}

export interface PatchNamePayload {
  user: TelegramUser;
  name: string;
}
