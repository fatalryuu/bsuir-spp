import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { io } from 'socket.io-client';
import { routes } from './routes';

const router = createBrowserRouter(routes);
export const socket = io(import.meta.env.VITE_WS_API_URL, {
  auth: {
    token: localStorage.getItem('access_token'),
  },
});

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
