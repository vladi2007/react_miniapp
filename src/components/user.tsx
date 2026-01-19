import "../assets/user.scss";
function User() {
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
              ></textarea>
              <div className="user_form_input_group_button">Сохранить</div>
            </div>
            <div className="user_form_input_info">
              <img
                src="/user/info.svg"
                className="user_form_input_info_icon"
              />
              <div className="user_form_input_info_text">
                Данное имя будет отображаться при создании интерактива и в
                отчетах
              </div>
            </div>
          </div>
        </form>
        <div className="user_info">
          <div className="user_info_part">
            Telegram username: <span>@</span>
          </div>
          <div className="user_info_part">
            Организация: <span></span>
          </div>
          <div className="user_info_part">
            Роль в организации: <span>Администратор</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
