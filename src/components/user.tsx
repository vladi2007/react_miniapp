import { useEffect } from 'react';
import { useUserContext } from '../App';
import { usePatchName } from '../hooks/useUser';
import '../assets/user.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { organizationUserName, type OrganizationUserNameSchema } from '../types/forms/org_user_name';
function User() {
  const context = useUserContext();
  const patchNameMutation = usePatchName(context?.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({ resolver: yupResolver(organizationUserName), mode: 'all', shouldFocusError: true });

  useEffect(() => {
    if (context)
      reset({
        name: context?.orgName?.name,
      });
  }, [context]);
  const handleSave = (data: OrganizationUserNameSchema) => {
    if (!context?.user) return;
    patchNameMutation.mutate({
      user: context.user,
      name: data.name,
    });
  };
  return (
    <>
      <div className="user">
        <form className="user_form" onSubmit={handleSubmit(handleSave)}>
          <div className="user_form_input">
            <div className="user_form_input_title">Имя пользователя:</div>
            <div className="user_form_input_group">
              <textarea className="user_form_input_group_input" placeholder="Сергеев Сергей Сергеевич" {...register('name')}></textarea>
              <button className="user_form_input_group_button" type="submit" disabled={isSubmitting || !isDirty}>
                Сохранить
              </button>
            </div>
            {errors.name?.message}
            <div className="user_form_input_info">
              <img src="/user/info.svg" className="user_form_input_info_icon" />
              <div className="user_form_input_info_text">Данное имя будет отображаться при создании интерактива и в отчетах</div>
            </div>
          </div>
        </form>
        <div className="user_info">
          <div className="user_info_part">
            Telegram username: <span>@{context?.orgName?.username}</span>
          </div>
          <div className="user_info_part">
            Организация: {context?.orgName?.organization_name} <span></span>
          </div>
          <div className="user_info_part">
            Роль в организации: <span>{context?.role}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
