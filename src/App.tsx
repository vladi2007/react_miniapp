import './App.css';
import Layout from './components/layout';
import Header from './components/header';
import Navigation from './components/navigation';
import { Outlet } from 'react-router';
import type { TelegramUser } from './types/telegram';
import { useEffect, useState } from 'react';
import axios from 'axios';
interface RoleResponse {
  role: string;
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
          console.log(err);
        }
      }

      tg?.setBackgroundColor('#ffffff');
    };

    init();
  }, [platform, tg]);

  if (!user) return null;

  return (
    <Layout>
      <Header user={user} />
      <Navigation />
      <Outlet />
      {role}
    </Layout>
  );
}

export default App;
