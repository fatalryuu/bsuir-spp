import { io } from '..';
import { NewUser } from '../drizzle/models';
import authService from '../services/auth';
import mediaService from '../services/media';
import usersService from '../services/users';
import { PatchUserBody } from '../types/users';
import { WS_MESSAGES } from '../types/ws';

class UsersController {
  async getUsers(admin: boolean | null) {
    const users = await usersService.getUsers(admin);

    io.emit(WS_MESSAGES.GET_USERS, users);
  }

  async createUser(body: NewUser) {
    const { fullName, email, password, avatarUrl, admin } = body;

    const user = await usersService.getUserByEmail(email);
    if (user) {
      io.emit(WS_MESSAGES.CREATE_USER_ERROR, { error: 'User already exists' });
      return;
    }

    const hashedPassword = await authService.hashPassword(password);

    await usersService.createUser({
      fullName,
      email,
      password: hashedPassword,
      avatarUrl,
      admin,
    });

    io.emit(WS_MESSAGES.CREATE_USER_SUCCESS);
  }

  async deleteUser(id: string) {
    const user = await usersService.getUserById(id);
    if (!user) {
      io.emit(WS_MESSAGES.DELETE_USER_ERROR, { error: 'User doest not exist' });
      return;
    }

    await mediaService.deleteByUrl(user.avatarUrl);
    await usersService.deleteUser(id);

    io.emit(WS_MESSAGES.DELETE_USER_SUCCESS);
  }

  async editUser(body: PatchUserBody) {
    const { id, ...fields } = body;

    const user = await usersService.getUserById(id);
    if (!user) {
      io.emit(WS_MESSAGES.EDIT_USER_ERROR, { error: 'User doest not exist' });
      return;
    }

    await usersService.editUser(id, fields);

    return io.emit(WS_MESSAGES.EDIT_USER_SUCCESS);
  }
}

export default new UsersController();
