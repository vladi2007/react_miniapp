import axios from 'axios';
import type { TelegramUser } from '../types/telegram';
import type { organizationName, organizationDescription, OrganizationParticipantsResponse } from '../types/api/organization';
const API_URL = 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const getRole = async (user: TelegramUser): Promise<string> => {
  const res = await api.get(`/api/organization/me/role?telegram_id=${user.id}`);
  return res.data.role;
};

export const getName = async (user: TelegramUser): Promise<organizationName> => {
  const res = await api.get(`/api/organization/me/name?telegram_id=${user.id}`);
  return res.data;
};

export const patchName = async (user: TelegramUser, name: string): Promise<organizationName> => {
  const res = await api.patch(`/api/organization/me/name?telegram_id=${user.id}&name=${name}`);
  return res.data;
};

export const getOrganization = async (user: TelegramUser): Promise<organizationDescription> => {
  const res = await api.get(`/api/organization/description?telegram_id=${user.id}`);
  return res.data;
};

export const patchOrganization = async (
  user: TelegramUser,
  organization_description: string | undefined,
  organization_name: string
): Promise<organizationDescription> => {
  const res = await api.patch(
    `/api/organization/description?telegram_id=${user.id}&organization_description=${organization_description}&organization_name=${organization_name}`
  );
  return res.data;
};

export const getParticipants = async (user: TelegramUser, filter: string): Promise<OrganizationParticipantsResponse> => {
  const res = await api.get(`/api/organization/participants?telegram_id=${user.id}&filter_parts=${filter}`);
  return res.data;
};
export const postParticipant = async (user: TelegramUser, role: string, participant_username: string): Promise<OrganizationParticipantsResponse> => {
  const res = await api.post(`/api/organization/participants?telegram_id=${user.id}&patch_role=${role}&patch_participant_username=${participant_username}`);
  return res.data;
};

export const patchParticipant = async (user: TelegramUser, role: string, participant_id: number): Promise<OrganizationParticipantsResponse> => {
  const res = await api.patch(`/api/organization/participant_change_role?telegram_id=${user.id}&patch_role=${role}&patch_participant_id=${participant_id}`);
  return res.data;
};
