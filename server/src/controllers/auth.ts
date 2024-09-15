import { LoginBody } from '../types/auth';
import usersService from '../services/users';
import authService from '../services/auth';
import { io } from '../services/ws';
import { WS_MESSAGES } from '../types/ws';

class AuthController {
  async login(body: LoginBody) {
    const { email, password } = body;

    const user = await usersService.getUserByEmail(email);
    if (!user) {
      io.emit(WS_MESSAGES.LOGIN_ERROR, { error: 'Invalid email or password' });
      return;
    }

    const isPasswordValid = await authService.isPasswordValid(password, user.password);
    if (!isPasswordValid) {
      io.emit(WS_MESSAGES.LOGIN_ERROR, { error: 'Invalid email or password' });
      return;
    }

    const accessToken = authService.generateAccessToken({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    });

    io.emit(WS_MESSAGES.LOGIN_SUCCESS, { accessToken });
  }
}

export default new AuthController();
