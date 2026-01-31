import * as yup from 'yup';
import type { UserRoleToAdd } from '../api/organization';

export const addUserToOrganization = yup.object({
  name: yup.string().required('username обязателен').min(3, '2<username<33').max(32, '2<username<33'),
  role: yup.mixed<UserRoleToAdd>().required(),
});

export type AddUserToOrganization = yup.InferType<typeof addUserToOrganization>;
