import "../assets/header.scss";
import type { TelegramUser } from "../types/telegram";

interface HeaderProps {
  user: TelegramUser | undefined;
}
function Header({user}: HeaderProps) {
    const orgs = false
  return (
    <>
    {user && (
      <div className="header_fon">
        <div className="header">
          <img src="/header/logo.svg" id="logo_header" />
          <div className="header_nav">
            <div className="header_nav_about_us">О нас</div>
            <div className="header_nav_organization_settings">
              <div className="header_nav_organization_settings_name"> ИРИТ РТФ</div>
              <img src="/header/picked_org.svg" />
              {orgs && (<div className="header_nav_item-dropdown-options">
                <div className="header_nav_item-dropdown-options-header" >
                  Выберите организацию:
                </div>
                <div className="header_nav_item-dropdown-option">Джойтека</div>
                <div className="header_nav_item-dropdown-option">Звезда</div>
                <div className="header_nav_item-dropdown-option">ИРИТ РТФ</div>
              </div>)}
            </div>
            <div className="header_nav_user">@{user?.username}</div>
            <div className="header_nav_photo">
              <img src={user?.photo_url}/>
            </div>
          </div>
        </div>
      </div>)}
    </>
  );
}

export default Header;
