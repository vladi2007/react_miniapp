import { Outlet } from 'react-router-dom';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
import { useRole } from './hooks/useRole';

function App() {
  useTelegram();
  useRole();
  return <Outlet />;
}

export default App;
