import { z } from 'zod';

export const schema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .min(1, { message: 'Email is required' }),
  password: z
    .string({ required_error: 'Password is required' })
    .trim()
    .min(1, { message: 'Password is required' }),
});

export type LoginSchema = z.infer<typeof schema>;
