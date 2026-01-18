import "./App.css";
import Layout from "./components/layout";
import Header from "./components/header";
import { useEffect } from "react";
function App() {
  const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
  const tg = window.Telegram?.WebApp;
  const platform = window.Telegram?.WebApp?.platform
  useEffect(() => {
    if (platform !== 'android' && platform !== 'ios') {
      window.Telegram?.WebApp?.requestFullscreen();
    }
    tg?.setBackgroundColor('#ffffff')
  })
  return (
    <>
      {true && (
        <Layout>
          <Header user ={user}/>
        </Layout>
      )}
    </>
  );
}

export default App;
