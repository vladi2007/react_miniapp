import { useDispatch } from 'react-redux';
import { useTelegramUser, type AppDispatch } from '../store';
import { useEffect } from 'react';
import { setTelegramUser } from '../features/user/userSlice';

export function useTelegram() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useTelegramUser();

  const tg = window.Telegram?.WebApp;
  const platform = window.Telegram?.WebApp?.platform;

  useEffect(() => {
    const telegramUser = tg?.initDataUnsafe?.user;
    if (telegramUser) {
      dispatch(setTelegramUser(telegramUser));
    }
    if (platform !== 'android' && platform !== 'ios') {
      tg?.requestFullscreen();
    }

    tg?.setBackgroundColor('#ffffff');
  }, [user]);

  if (!user) return;

  return { user };
}
