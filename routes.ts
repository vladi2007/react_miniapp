import { createBrowserRouter } from 'react-router';
import App from './src/App';
import Main from './src/components/main_menu';
import User from './src/components/user';

export const routes = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Main },
      { path: '/user', Component: User },
    ],
  },
]);
