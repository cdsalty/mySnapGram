import { z } from 'zod';

export const SignUpValidationSchema = z.object({
  name: z.string().min(2, { message: 'Too short' }),
  username: z.string().min(2, { message: 'Too short' }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'The Password must be a minimum of 8 characters.' }),
});
