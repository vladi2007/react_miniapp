import { useState } from 'react';
import { useOrgParticipants, useAddUser, usePatchUser } from '../hooks/useUser';
import { useUserContext } from '../App';
import '../assets/users.scss';
import type { OrganizationParticipant, UserRole, UsersFilter, UserRoleToAdd } from '../types/api/organization';
import type { AxiosError } from 'axios';
function Users() {
  const context = useUserContext();

  const [filter, setFilter] = useState<UsersFilter>('all');
  const [userNameToAdd, setUserNameToAdd] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<UserRoleToAdd>('leader');
  const [selectedRoleToChange, setSelectedRoleToChange] = useState<UserRole>('leader');
  const [isAddRoleOpened, setIsAddRoleOpened] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<number>(0);
  const [showChangeRole, setShowChangeRole] = useState<number>(0);
  const [showAddUser, setShowAddUser] = useState<boolean>(false);
  const [showChoiceRole, setShowChoiceRole] = useState<number>(0);

  const { data: orgParts, isLoading: _ } = useOrgParticipants(context?.user, filter);
  const addUserMutation = useAddUser();
  const patchUserMutation = usePatchUser();
  const handlePatchUser = (id: number, role: string) => {
    patchUserMutation.mutate({
      user: context?.user,
      participant_id: id,
      role: role,
    });
    setShowDelete(0);
    setShowChangeRole(0);
  };
  const handleAddUser = async () => {
    if (!userNameToAdd || userNameToAdd.length < 3) {
      window?.Telegram?.WebApp?.showAlert('username должно быть длинее 2 символов');
      return;
    }
    try {
      await addUserMutation.mutateAsync({
        user: context?.user,
        participant_username: userNameToAdd,
        role: selectedRole,
      });

      setShowAddUser(false);
    } catch (err) {
      const error = err as AxiosError<{ detail: string }>;
      console.log(error.response?.data.detail);
      if (error.status === 409) {
        const inviteLink = `https://t.me/ClikInteractive_Bot?start=${context?.user?.id}_${selectedRole}`;

        navigator.clipboard
          .writeText(inviteLink)
          .then(() => {
            window.Telegram?.WebApp?.showAlert(`Пользователь не найден.\nСсылка для приглашения уже скопирована:\n${inviteLink}`);
          })
          .catch(() => {
            window.Telegram?.WebApp?.showAlert(`Пользователь не найден.\nНе удалось скопировать ссылку, вот она:\n${inviteLink}`);
          });
      }
      if (error.status === 404) {
        window.Telegram?.WebApp?.showAlert('Этот пользователь уже состоит в вашей организации');
      }
    }
    return false;
  };

  const groups: Record<UsersFilter, string> = {
    all: 'Все',
    admin: 'Администраторы',
    leader: 'Ведущие',
  };
  const rolesToAdd: Record<UserRoleToAdd, string> = {
    leader: 'Ведущий',
    admin: 'Администратор',
  };
  const roles: Record<UserRole, string> = {
    admin: 'Администратор',
    leader: 'Ведущий',
    organizer: 'Создатель организации',
  };
  const canChangeRole = (participantRole: string, yourRole: string | undefined, isYou: boolean) => {
    if (isYou) return false; // с самим собой нельзя действия производить
    if (yourRole === 'organizer') {
      // если вы орг, то вы можете удалять кого угодно и менять роль кому угодно
      return true;
    } else if (yourRole === 'admin') {
      if (participantRole === 'organizer') return false;
      if (participantRole === 'leader') return true; // если вы админ то вы можете поменять роль только ведущему и только на админа
      if (participantRole === 'admin') return false;
    } else return false; // если вы не админ и не орг то никакие действия не можете выполнять
  };
  return (
    <>
      <div className="users">
        <div className="users_title">Пользователи</div>
        <form className="users_form">
          <div className="users_form_finder_finder">
            <img className="users_form_input-icon" src="/users/find.svg" />

            <input type="text" placeholder="Поиск участника" className="users_form_search-input" />
          </div>
          <div
            className="users_form_button"
            onClick={() => {
              setShowAddUser(true);
              setShowChoiceRole(0);
            }}
          >
            <div>Добавить</div>
            <img src="/users/add.svg"></img>
          </div>
        </form>
        <div className="users_list">
          <div className="users_list_groups">
            {Object.entries(groups).map(([key, label]) => (
              <div className="group" onClick={() => setFilter(key as UsersFilter)} key={key}>
                {filter === key && <div className="group_active"></div>}
                <div className="group_value">{label}</div>
              </div>
            ))}
          </div>
          <div className="users_list_list_column">
            <div className="users_list_list">
              <div className="users_list_list_header">
                <span className="users_list_list_name" style={{ color: '#853CFF' }}>
                  Имя
                </span>
                <span className="users_list_list_role" style={{ color: '#853CFF' }}>
                  Роль
                </span>
              </div>
              <div className="users_list_list_line"></div>
            </div>
            {orgParts?.participants.map((user: OrganizationParticipant) => (
              <div className="users_list_list_list" key={user.id}>
                <div className="users_list_list_header">
                  <div style={{ display: 'grid' }}>
                    <span className="users_list_list_name">{user.name}</span>
                    <span>@{user.username}</span>
                  </div>

                  <div>
                    <div
                      style={{ display: 'flex', alignItems: 'center', cursor: canChangeRole(user.role, context.role, user.is_you) ? 'pointer' : 'default' }}
                      className={`user_list_list_role${canChangeRole(user.role, context.role, user.is_you) ? '_' : ''}`}
                      onClick={() => {
                        if (canChangeRole(user.role, context.role, user.is_you)) {
                          if (showChoiceRole === 0) setShowChoiceRole(user.id);
                          else setShowChoiceRole(0);
                        }
                      }}
                    >
                      <div style={{ color: '#7D7D7D' }}>{roles[user.role]}</div>

                      {canChangeRole(user.role, context.role, user.is_you) && <img src="/users/open.svg" className="open_role" />}
                    </div>
                    {showChoiceRole === user.id && (
                      <div className="users_list_item-dropdown-options">
                        <div
                          className="users_list_item-dropdown-option option_margin"
                          onClick={() => {
                            if (user.role === 'leader') {
                              setShowChangeRole(user.id);
                              setSelectedRoleToChange('admin');
                              setShowChoiceRole(0);
                            }
                          }}
                        >
                          <span>Выдать роль “Администратор”</span>
                        </div>
                        <div
                          className="users_list_item-dropdown-option option_second_margin"
                          onClick={() => {
                            if (user.role === 'admin') {
                              setShowChangeRole(user.id);
                              setSelectedRoleToChange('leader');
                              setShowChoiceRole(0);
                            }
                          }}
                        >
                          <span>Выдать роль “Ведущий”</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {canChangeRole(user.role, context.role, user.is_you) && (
                    <img className="kick_user" src="/users/kick.svg" onClick={() => setShowDelete(user.id)} />
                  )}
                </div>
                <div className="users_list_list_line"></div>
              </div>
            ))}
          </div>
        </div>
        {showDelete > 0 && (
          <div className="users_popup-overlay">
            <div className="users_popup-content" onClick={(e) => e.stopPropagation()}>
              <div className="users_popup-text">
                Вы уверены, что хотите удалить пользователя
                <br />
                <span style={{ color: '#853CFF' }}>{orgParts?.participants.find((p) => p.id === showDelete)?.name}</span>?
              </div>
              <div className="users_popup-text_">Это действие отменить будет невозможно. </div>
              <div className="users_popup-buttons">
                <button className="users_popup-btn cancel delete" onClick={() => setShowDelete(0)}>
                  Отменить
                </button>
                <button className="users_popup-btn confirm delete" onClick={() => handlePatchUser(showDelete, 'remote')}>
                  Удалить
                </button>
              </div>
            </div>
          </div>
        )}
        {showChangeRole > 0 && (
          <div className="users_popup-overlay" onClick={() => setShowChangeRole(0)}>
            <div className="users_change_popup-content" onClick={(e) => e.stopPropagation()}>
              <div className="users_popup-text">
                Вы уверены, что хотите выдать роль {roles[selectedRoleToChange]} пользователю{' '}
                <span style={{ color: '#853CFF' }}>{orgParts?.participants.find((p) => p.id === showChangeRole)?.name}</span>?
              </div>
              <div className="users_popup-buttons margin">
                <div
                  className="users_popup-btn cancel"
                  onClick={() => {
                    setShowChangeRole(0);
                  }}
                >
                  Отменить
                </div>
                <div className="users_popup-btn confirm" onClick={() => handlePatchUser(showChangeRole, selectedRoleToChange)}>
                  Выдать
                </div>
              </div>
            </div>
          </div>
        )}
        {showAddUser && (
          <div
            className="users_popup-overlay"
            onClick={() => {
              setShowAddUser(false);
              setIsAddRoleOpened(false);
            }}
          >
            <div
              className="add_popup-content"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <img
                src="/users/closeAdd.svg"
                onClick={() => {
                  setShowAddUser(false);
                  setUserNameToAdd('');
                  setSelectedRole('leader');
                }}
                className="add_popup-close"
              />
              <div className="add_popup-text">Добавление пользователя в организацию</div>
              <form className="add_form">
                <textarea
                  placeholder="Введите  username в telegram: @ffadff "
                  value={userNameToAdd}
                  maxLength={32}
                  onChange={(e) => {
                    setUserNameToAdd(e.target.value);
                  }}
                />
                <div className="add_custom-dropdown" onClick={() => setIsAddRoleOpened(!isAddRoleOpened)}>
                  <div className="add_custom-dropdown-selected">{rolesToAdd[selectedRole]}</div>
                  <div className="add_custom-arrow">
                    <img src="/users/open_add.svg" />
                    <img />
                  </div>
                </div>
                {isAddRoleOpened && (
                  <div className="add_custom-dropdown-options">
                    <div className="add_custom-dropdown-option-list">
                      {Object.entries(rolesToAdd).map(([key, label]) => (
                        <div
                          className="add_custom-dropdown-option"
                          key={key}
                          onClick={() => {
                            setSelectedRole(key as UserRoleToAdd);
                            setIsAddRoleOpened(false);
                          }}
                        >
                          {selectedRole === (key as UserRoleToAdd) && <img className="add_custom-dropdown-circle" src="/users/picked_role.svg" />}
                          {selectedRole !== (key as UserRoleToAdd) && <img className="add_custom-dropdown-circle" src="/users/unpicked_role.svg" />}
                          <div className="add_custom-dropdown-text">{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </form>
              <div className="add_popup-btn" onClick={handleAddUser}>
                Добавить
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Users;
