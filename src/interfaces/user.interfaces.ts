import { z } from 'zod';
import { userCreateSchema, userReadSchema, userReturnSchema } from '../schemas/user.schema';
import { DeepPartial, Repository } from 'typeorm';
import { User } from '../entities';

export type TUserCreate = z.infer<typeof userCreateSchema>;
export type TUserRead = z.infer<typeof userReadSchema>;
export type TUserReturn = z.infer<typeof userReturnSchema>;
export type TUserUpdate = DeepPartial<User>;
export type TUserRepo = Repository<User>;
