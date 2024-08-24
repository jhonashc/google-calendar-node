import { z } from 'zod';

export const envsSchema = z.object({
  PORT: z
    .string()
    .min(1, 'PORT is required')
    .refine((value) => !isNaN(Number(value)), 'PORT must be a valid number'),
  CLIENT_ID: z.string().min(1, 'CLIENT_ID is required'),
  CLIENT_SECRET: z.string().min(1, 'CLIENT_SECRET is required'),
  REDIRECT_URL: z.string().url('REDIRECT_URL must be a valid URL').min(1, 'REDIRECT_URL is required'),
});
