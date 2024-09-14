import { z } from 'zod';

export const schema = z.object({
  fullName: z
    .string({ required_error: 'Full name is required' })
    .trim()
    .min(1, { message: 'Full name is required' }),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .min(1, { message: 'Email is required' })
    .email('Invalid email address'),
  admin: z.boolean(),
});

export type EditUserSchema = z.infer<typeof schema>;
