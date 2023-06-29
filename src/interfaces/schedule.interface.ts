import { z } from 'zod';
import { scheduleCreateSchema, scheduleReadSchema } from '../schemas/schedule.schema';
import { Schedule } from '../entities';
import { Repository } from 'typeorm';

export type TScheduleCreate = z.infer<typeof scheduleCreateSchema>;
export type TScheduleRead = z.infer<typeof scheduleReadSchema>;
export type TScheduleRepo = Repository<Schedule>;
