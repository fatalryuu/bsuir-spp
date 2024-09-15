import { Server } from 'socket.io';
import { WS_MESSAGES } from '../types/ws';
import authController from '../controllers/auth';
import usersController from '../controllers/users';
import mediaController from '../controllers/media';
import authService from '../services/auth';

export const io = new Server(Number(process.env.WS_PORT), {
  cors: {
    origin: 'http://localhost:5173',
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;

  if (token) {
    try {
      authService.verifyAccessToken(token);
      (socket as any).authenticated = true;
    } catch (e) {
      (socket as any).authenticated = false;
    }
    next();
  } else {
    (socket as any).authenticated = false;
    next();
  }
});

io.on('connection', (socket) => {
  socket.on(WS_MESSAGES.LOGIN, authController.login);

  const requireAuth = (callback) => {
    return (...args) => {
      if (!(socket as any).authenticated) {
        socket.emit(WS_MESSAGES.TOKEN_ERROR);
      } else {
        callback(...args);
      }
    };
  };

  socket.on(WS_MESSAGES.GET_USERS, requireAuth(usersController.getUsers));
  socket.on(WS_MESSAGES.DELETE_USER, requireAuth(usersController.deleteUser));
  socket.on(WS_MESSAGES.EDIT_USER, requireAuth(usersController.editUser));
  socket.on(WS_MESSAGES.CREATE_USER, requireAuth(usersController.createUser));
  socket.on(WS_MESSAGES.UPLOAD, requireAuth(mediaController.upload));
});
