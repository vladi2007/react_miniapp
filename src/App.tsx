import './App.css';

import { Outlet, useOutletContext } from 'react-router-dom';
import type { TelegramUser } from './types/telegram';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
interface RoleResponse {
  role: string;
}

interface UserContext {
  user?: TelegramUser | undefined;
  role?: string | undefined;
}

function App() {
  const [user, setUser] = useState<TelegramUser | undefined>();
  const [role, setRole] = useState<string | undefined>();
  const tg = window.Telegram?.WebApp;
  const platform = window.Telegram?.WebApp?.platform;

  useEffect(() => {
    const init = async () => {
      // Telegram WebApp setup
      if (platform !== 'android' && platform !== 'ios') {
        window.Telegram?.WebApp?.requestFullscreen();
      }

      const telegramUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
      setUser(telegramUser);

      if (telegramUser?.id) {
        try {
          const telegramId = telegramUser.id;
          const res = await axios.get<RoleResponse>(`http://localhost:3001/api/role?telegram_id=${telegramId}`);
          setRole(res.data.role);
        } catch (err) {
          console.error(err);
          <Navigate to="not_access" />;
        }
      }

      tg?.setBackgroundColor('#ffffff');
    };

    init();
  }, []);

  if (!user || !role) return <div>Загрузка...</div>;
  return <Outlet context={{ user, role } satisfies UserContext} />;
}
export function useUserContext() {
  return useOutletContext<UserContext>();
}
export default App;
