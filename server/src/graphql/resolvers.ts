import usersService from '../services/users';
import authService from '../services/auth';
import * as model from '../drizzle/models';
import { PatchUserBody } from '../types/users';

export const resolvers = {
  Query: {
    users: async (_: any, { admin }: { admin: boolean | null }) => {
      return await usersService.getUsers(admin);
    },
    userById: async (_: any, { id }: { id: string }) => {
      return await usersService.getUserById(id);
    },
    userByEmail: async (_: any, { email }: { email: string }) => {
      return await usersService.getUserById(email);
    },
  },
  Mutation: {
    login: async (_: any, { email, password }: { email: string; password: string }) => {
      const user = await usersService.getUserByEmail(email);
      if (!user) {
        return;
      }

      const isPasswordValid = await authService.isPasswordValid(password, user.password);
      if (!isPasswordValid) {
        return;
      }

      const accessToken = authService.generateAccessToken({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      });

      return accessToken;
    },
    createUser: async (_: any, { input }: { input: model.NewUser }) => {
      return await usersService.createUser(input);
    },
    deleteUser: async (_: any, { id }: { id: string }) => {
      await usersService.deleteUser(id);
    },
    editUser: async (_: any, { id, input }: { id: string; input: Omit<PatchUserBody, 'id'> }) => {
      await usersService.editUser(id, input);
    },
  },
};
