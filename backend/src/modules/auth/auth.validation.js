import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().email('Please enter a valid email address').toLowerCase().trim(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['ADMIN', 'STAFF', 'CUSTOMER']).optional().default('CUSTOMER'),
    phone: z.string().optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Please enter a valid email address').toLowerCase().trim(),
    password: z.string().min(1, 'Password is required'),
  }),
});
