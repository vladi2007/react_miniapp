import '../assets/organization.scss';
import { useUserContext } from '../App';
import { useOrgDesc } from '../hooks/useUser';
import { useEffect } from 'react';
import { usePatchOrg } from '../hooks/useUser';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import { organizationSettings, type OrganizationSettingsSchema } from '../types/forms/organization_settings';
function Organization() {
  const context = useUserContext();
  const patchOrgMutation = usePatchOrg();
  const { data: orgData, isLoading: orgLoading } = useOrgDesc(context?.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({ resolver: yupResolver(organizationSettings), mode: 'all', shouldFocusError: true, shouldUseNativeValidation: false });

  useEffect(() => {
    if (orgData) {
      reset({
        name: orgData.organization_name,
        description: orgData.organization_description,
      });
    }
  }, [orgData, reset]);
  if (orgLoading) return;

  const handleSave = (data: OrganizationSettingsSchema) => {
    if (!context?.user) return;
    patchOrgMutation.mutate({
      user: context.user,
      organization_name: data.name,
      organization_description: data.description,
    });
  };
  return (
    <>
      <div className="organization">
        <form className="org_form" onSubmit={handleSubmit(handleSave)}>
          <div className="org_form_input">
            <div className="org_form_input_title">Название организации:</div>
            <textarea className="org_form_input_input" placeholder="Название" {...register('name')}></textarea>
            <ErrorMessage errors={errors} name="name" render={({ message }) => <p>{message}</p>} />
          </div>
          <div className="org_form_input">
            <div className="org_form_input_title">Описание организации:</div>
            <textarea className="org_form_input_input" placeholder="Описание" {...register('description')}></textarea>
            <ErrorMessage errors={errors} name="description" render={({ message }) => <p>{message}</p>} />
          </div>
          <button className="org_form_input_button" type="submit" disabled={isSubmitting || !isDirty}>
            Сохранить изменения
          </button>
        </form>
      </div>
    </>
  );
}
export default Organization;
