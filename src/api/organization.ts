import axios from 'axios';
import type { TelegramUser } from '../types/telegram';
import type { organizationName } from '../types/api/organization';
const API_URL = 'http://localhost:3001';

export const getRole = async (user: TelegramUser): Promise<string> => {
  try {
    const res = await axios.get(`${API_URL}/api/organization/me/role?telegram_id=${user.id}`);
    return res.data.role;
  } catch (err) {
    console.error('Ошибка запроса роли:', err);
    throw new Error('Не удалось получить роль');
  }
};

export const getName = async (user: TelegramUser): Promise<organizationName> => {
  try {
    const res = await axios.get(`${API_URL}/api/organization/me/name?telegram_id=${user.id}`);
    return res.data;
  } catch (err) {
    console.error('Ошибка запроса имени:', err);
    throw new Error('Не удалось получить имя');
  }
};

export const patchName = async (user: TelegramUser, name: string | undefined): Promise<organizationName> => {
  try {
    const res = await axios.patch(`${API_URL}/api/organization/me/name?telegram_id=${user.id}&name=${name}`);
    return res.data;
  } catch (err) {
    console.error('Ошибка запроса на изменение имени:', err);
    throw new Error('Не удалось изменить имя');
  }
};
