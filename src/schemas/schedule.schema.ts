import { z } from 'zod';
import { userReturnSchema } from './user.schema';
import { realEstateSchema } from './realEstate.schema';

//  date: z.string().or(z.date()),
//   date: z.string().refine((date) => date),
//   date: z.string().or(z.date().max(new Date('1900-01-01'))),
//   hour: z.string().transform((time) => time),

export const scheduleSchema = z.object({
  id: z.number().int().positive(),
  date: z.string(),
  hour: z.string(),
  realState: realEstateSchema,
});

export const scheduleCreateSchema = scheduleSchema
  .omit({
    id: true,
    realState: true,
  })
  .extend({
    realEstateId: z.number().int().positive(),
  });

export const scheduleReturnSchema = scheduleCreateSchema.extend({
  user: userReturnSchema,
});

export const scheduleReadSchema = scheduleCreateSchema.array();
