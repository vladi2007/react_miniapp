import axios from 'axios';
import type { TelegramUser } from '../types/telegram';

const API_URL = 'http://localhost:3001';

export const getRole = async (user: TelegramUser): Promise<string> => {
  try {
    const res = await axios.get(`${API_URL}/api/role?telegram_id=${user.id}`);
    return res.data.role;
  } catch (err) {
    console.error('Ошибка запроса роли:', err);
    throw new Error('Не удалось получить роль');
  }
};
