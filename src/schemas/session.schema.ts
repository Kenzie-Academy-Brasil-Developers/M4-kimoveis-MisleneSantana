import { z } from 'zod';

export const sessionLoginCreateSchema = z.object({
  email: z.string().max(45).email(),
  password: z.string().max(120),
});
