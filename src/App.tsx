import { Outlet, useOutletContext } from 'react-router-dom';
import type { TelegramUser } from './types/telegram';
import type { UserContext } from './types/user';
import { useEffect, useState } from 'react';
import { useUser, useName } from './hooks/useUser';
import './App.css';

function App() {
  const [user, setUser] = useState<TelegramUser>();
  const tg = window.Telegram?.WebApp;
  const platform = window.Telegram?.WebApp?.platform;
  const { data: role, isLoading: roleLoading } = useUser(user);
  const { data: nameData, isLoading: nameLoading } = useName(user);

  useEffect(() => {
    const telegramUser = tg?.initDataUnsafe?.user;
    if (telegramUser) setUser(telegramUser);

    if (platform !== 'android' && platform !== 'ios') {
      tg?.requestFullscreen();
    }

    tg?.setBackgroundColor('#ffffff');
  }, []);

  if (!user || roleLoading || nameLoading) return;

  return <Outlet context={{ user: user, role: role, orgName: nameData } satisfies UserContext} />;
}

// Хук для дочерних компонентов
export function useUserContext() {
  return useOutletContext<UserContext>();
}

export default App;
