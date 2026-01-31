import * as yup from 'yup';

export const organizationSettings = yup.object({
  name: yup
    .string()
    .required('Название организации обязательно')
    .min(3, 'Длина названия должна быть между 2 и 33')
    .max(32, 'Длина названия должна быть между 2 и 33'),
  description: yup.string().max(200, 'Описание должно быть быть меньше 200 символов'),
});

export type OrganizationSettingsSchema = yup.InferType<typeof organizationSettings>;
