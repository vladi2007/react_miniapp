import axios, { AxiosError } from 'axios';
import type { TelegramUser } from '../types/telegram';
import type { organizationName, organizationDescription, OrganizationParticipantsResponse } from '../types/api/organization';
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

export const patchName = async (user: TelegramUser, name: string): Promise<organizationName> => {
  try {
    const res = await axios.patch(`${API_URL}/api/organization/me/name?telegram_id=${user.id}&name=${name}`);
    return res.data;
  } catch (err) {
    console.error('Ошибка запроса на изменение имени:', err);
    throw new Error('Не удалось изменить имя');
  }
};

export const getOrganization = async (user: TelegramUser): Promise<organizationDescription> => {
  try {
    const res = await axios.get(`${API_URL}/api/organization/description?telegram_id=${user.id}`);
    return res.data;
  } catch (err) {
    console.error('Ошибка запроса данных организации:', err);
    throw new Error('Не удалось данные организации');
  }
};

export const patchOrganization = async (
  user: TelegramUser,
  organization_description: string | undefined,
  organization_name: string
): Promise<organizationDescription> => {
  try {
    const res = await axios.patch(
      `${API_URL}/api/organization/description?telegram_id=${user.id}&organization_description=${organization_description}&organization_name=${organization_name}`
    );
    return res.data;
  } catch (err) {
    console.error('Ошибка запроса на изменение данных организации:', err);
    throw new Error('Не удалось изменить данные организации');
  }
};

export const getParticipants = async (user: TelegramUser, filter: string): Promise<OrganizationParticipantsResponse> => {
  try {
    const res = await axios.get(`${API_URL}/api/organization/participants?telegram_id=${user.id}&filter=${filter}`);
    return res.data;
  } catch (err) {
    console.error('Ошибка запроса участников организации:', err);
    throw new Error('Не удалось данные участников организации');
  }
};
export const postParticipant = async (user: TelegramUser, role: string, participant_username: string): Promise<OrganizationParticipantsResponse> => {
  try {
    const res = await axios.post(`${API_URL}/api/organization/participants?telegram_id=${user.id}&role=${role}&participant_username=${participant_username}`);
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};

export const patchParticipant = async (user: TelegramUser, role: string, participant_id: number): Promise<OrganizationParticipantsResponse> => {
  try {
    const res = await axios.patch(`${API_URL}/api/organization/participant_change_role?telegram_id=${user.id}&role=${role}&participant_id=${participant_id}`);
    return res.data;
  } catch (err) {
    const error = err as AxiosError;

    // просто пробрасываем дальше
    throw error;
  }
};
