import { createBrowserRouter } from 'react-router';
import App from './src/App';
import Main from './src/components/main_menu';
import User from './src/components/user';
import PrivateLayout from './src/components/private_layout';
import NotAcess from './src/components/not_access';
import EmptyLayout from './src/components/empty_layout';
import ProtectedRoute from './src/components/protected_route';
import Organization from './src/components/organization';
export const routes = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        Component: ProtectedRoute,
        children: [
          {
            Component: PrivateLayout,
            children: [
              { index: true, Component: Main },
              { path: 'user', Component: User },
              { path: 'organization', Component: Organization },
            ],
          },
        ],
      },
      {
        Component: EmptyLayout,
        children: [{ path: 'not_access', Component: NotAcess }],
      },
    ],
  },
]);
