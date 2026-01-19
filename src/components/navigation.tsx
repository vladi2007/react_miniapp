import "../assets/navigation.scss"
import { NavLink } from "react-router";
function Navigation(){
    return (
        <>
        <div className="nav" >
           
            <NavLink to="/interactives" className="nav_interactives" >
                Интерактивы
            </NavLink >
            <NavLink to="/reports" className= "nav_reports" >
                Отчеты
            </NavLink>
            <NavLink to="/broadcasts" className="nav_broadcasts">
                Рассылка
            </NavLink>
            <NavLink to="/users" className="nav_broadcasts margins" >
                Пользователи
            </NavLink>
            <NavLink  to="/organization" className="nav_broadcasts" >
                Настройки организации
            </NavLink>
        </div>
        </>
    )
}

export default Navigation