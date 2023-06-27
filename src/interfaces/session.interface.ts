import { z } from 'zod';
import { sessionLoginCreateSchema } from '../schemas/session.schema';

export type TSessionLoginCreate = z.infer<typeof sessionLoginCreateSchema>;

export type TSessionLoginReturn = {
  token: string;
};
