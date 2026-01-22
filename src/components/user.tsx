import { useState } from 'react';
import { useUserContext } from '../App';
import { usePatchName } from '../hooks/useUser';
import '../assets/user.scss';
function User() {
  const context = useUserContext();
  const [orgName, setOrgName] = useState(context?.orgName?.name);
  const patchNameMutation = usePatchName(context?.user);

  const handleSave = () => {
    if (!context?.user || !orgName) return;

    patchNameMutation.mutate({
      user: context.user,
      name: orgName,
    });
  };
  return (
    <>
      <div className="user">
        <form className="user_form">
          <div className="user_form_input">
            <div className="user_form_input_title">Имя пользователя:</div>
            <div className="user_form_input_group">
              <textarea
                className="user_form_input_group_input"
                placeholder="Сергеев Сергей Сергеевич"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              ></textarea>
              <div className="user_form_input_group_button" onClick={handleSave}>
                Сохранить
              </div>
            </div>
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
