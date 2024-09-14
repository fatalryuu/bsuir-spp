import { Navigate } from 'react-router-dom';

import UsersPage from '../components/pages/Users';
import { APP_ROUTES, Route } from '../types/router';
import LoginPage from '../components/pages/Login';

export const routes: Route[] = [
  {
    path: APP_ROUTES.BASE,
    element: <Navigate to="/users" replace />,
  },
  {
    path: APP_ROUTES.USERS,
    element: <UsersPage />,
  },
  {
    path: APP_ROUTES.LOGIN,
    element: <LoginPage />,
  },
];
