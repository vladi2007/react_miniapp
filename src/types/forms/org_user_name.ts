import * as yup from 'yup';

export const organizationUserName = yup.object({
  name: yup.string().required('ФИО обязательно').min(3, 'Длина вашего ФИО должна быть между 2 и 33').max(32, 'Длина вашего ФИО должна быть между 2 и 33'),
});

export type OrganizationUserNameSchema = yup.InferType<typeof organizationUserName>;
