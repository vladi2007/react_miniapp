import { Outlet, useOutletContext } from 'react-router-dom';
import type { TelegramUser } from './types/telegram';
import { useEffect, useState } from 'react';
import { useUser } from './hooks/useUser';
import './App.css';

interface UserContext {
  user?: TelegramUser;
  role?: string;
}

function App() {
  const [user, setUser] = useState<TelegramUser>();
  const tg = window.Telegram?.WebApp;
  const platform = window.Telegram?.WebApp?.platform;

  const { data: role, isLoading: roleLoading } = useUser(user);

  useEffect(() => {
    const telegramUser = tg?.initDataUnsafe?.user;
    if (telegramUser) setUser(telegramUser);

    if (platform !== 'android' && platform !== 'ios') {
      tg?.requestFullscreen();
    }

    tg?.setBackgroundColor('#ffffff');
  }, []);

  if (!user || roleLoading) return;

  return <Outlet context={{ user, role } satisfies UserContext} />;
}

// Хук для дочерних компонентов
export function useUserContext() {
  return useOutletContext<UserContext>();
}

export default App;
