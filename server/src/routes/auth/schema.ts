import { z } from 'zod';

export default {
  login: z.object({
    body: z.object({
      email: z.string({ required_error: 'Email is required' }).trim().min(1),
      password: z.string({ required_error: 'Password is required' }).trim().min(1),
    }),
  }),
};
