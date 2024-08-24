import { z } from 'zod';

export const envsSchema = z.object({
  PORT: z.string().min(1),
});
