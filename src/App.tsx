import "./App.css";
import Layout from "./components/layout";
import Header from "./components/header";
import Navigation from "./components/navigation";
import { Outlet } from "react-router";


import type { TelegramUser } from "./types/telegram"
import { useEffect, useState } from "react";
function App() {
  const [user, setUser] = useState<TelegramUser | undefined>();
  const tg = window.Telegram?.WebApp;
  const platform = window.Telegram?.WebApp?.platform
  useEffect(() => {
    if (platform !== 'android' && platform !== 'ios') {
      window.Telegram?.WebApp?.requestFullscreen();
      setUser(window.Telegram?.WebApp?.initDataUnsafe?.user)
    }
    tg?.setBackgroundColor('#ffffff')
  }, [])
  return (
    <>
      {user && (
        <Layout>
          <Header user ={user}/>
          <Navigation/>
          <Outlet/>
        </Layout>
      )}
    </>
  );
}

export default App;
