import { Request, Response } from 'express';
import usersService from '../../services/users';
import authService from '../../services/auth';
import mediaService from '../../services/media';
import { NewUser } from '../../drizzle/models';
import { GetUsersQuery, PatchUserBody } from '../../types/users';

class UsersController {
  async getUsers(req: Request<unknown, unknown, unknown, GetUsersQuery>, res: Response) {
    const { admin } = req.query;

    const users = await usersService.getUsers(admin);

    res.status(200).json({ users });
  }

  async createUsers(req: Request<unknown, unknown, NewUser>, res: Response) {
    const { fullName, email, password, avatarUrl, admin } = req.body;

    const user = await usersService.getUserByEmail(email);
    if (user) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await authService.hashPassword(password);

    const createdUser = await usersService.createUsers({
      fullName,
      email,
      password: hashedPassword,
      avatarUrl,
      admin,
    });

    res.status(201).json({ user: createdUser });
  }

  async deleteUser(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    const user = await usersService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'User doest not exist' });
    }

    await mediaService.deleteByUrl(user.avatarUrl);
    await usersService.deleteUser(id);

    res.status(204).json({});
  }

  async editUser(req: Request<{ id: string }, unknown, PatchUserBody>, res: Response) {
    const { id } = req.params;

    const user = await usersService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'User doest not exist' });
    }

    const updatedUser = await usersService.editUser(id, req.body);

    return res.status(201).json({ user: updatedUser });
  }
}

export default new UsersController();
