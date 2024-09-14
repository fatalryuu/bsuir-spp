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
  password: z
    .string({ required_error: 'Password is required' })
    .trim()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[0-9]/, 'Password must contain at least one digit')
    .regex(/[a-zA-Z]/, 'Password must contain at least one letter'),
  admin: z.boolean(),
  avatar: z
    .custom<FileList>((files) => files.length === 1, { message: 'Select one image' })
    .refine((files) => files[0]?.type.startsWith('image/'), {
      message: 'Only image files are allowed',
    }),
});

export type CreateUserSchema = z.infer<typeof schema>;
