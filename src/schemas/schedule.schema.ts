import { z } from 'zod';
import { userReturnSchema } from './user.schema';
import { realEstateCreateSchema } from './realEstate.schema';

export const scheduleSchema = z.object({
  id: z.number().int().positive(),
  date: z.string(),
  hour: z.string(),
  user: userReturnSchema,
  realEstate: realEstateCreateSchema,
});

export const scheduleCreateSchema = scheduleSchema
  .omit({
    id: true,
    user: true,
    realEstate: true,
  })
  .extend({
    realEstateId: z.number().int().positive(),
  });

export const scheduleReadSchema = scheduleCreateSchema.array();
