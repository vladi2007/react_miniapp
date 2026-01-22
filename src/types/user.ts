import type { TelegramUser } from '../types/telegram';
import type { organizationName } from '../types/api/organization';

export interface UserContext {
  user?: TelegramUser;
  role?: string;
  orgName?: organizationName;
}
