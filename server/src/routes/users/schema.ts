import { z } from 'zod';

export default {
  getUsers: z.object({
    query: z
      .object({
        admin: z.enum(['false', 'true']).optional(),
      })
      .optional(),
  }),
  createUser: z.object({
    body: z.object({
      fullName: z.string({ required_error: 'Full name is required' }).trim().min(1),
      email: z.string({ required_error: 'Email is required' }).email(),
      password: z
        .string({ required_error: 'Password is required' })
        .trim()
        .min(8, 'Password must be at least 8 characters long')
        .regex(/[0-9]/, 'Password must contain at least one digit')
        .regex(/[a-zA-Z]/, 'Password must contain at least one letter'),
      avatarUrl: z.string().trim().url({ message: 'Invalid URL' }).optional(),
      admin: z.boolean().optional(),
    }),
  }),
  deleteUser: z.object({
    params: z.object({
      id: z.string({ required_error: 'ID is required' }).uuid(),
    }),
  }),
  editUser: z.object({
    params: z.object({
      id: z.string({ required_error: 'ID is required' }).uuid(),
    }),
    body: z.object({
      fullName: z.string({ required_error: 'Full name is required' }).trim().min(1),
      email: z.string({ required_error: 'Email is required' }).email(),
      admin: z.boolean().optional(),
    }),
  }),
};
