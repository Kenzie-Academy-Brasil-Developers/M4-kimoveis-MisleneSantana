import { z } from 'zod';
import { categoryCreateSchema, categoryReadSchema } from '../schemas/category.schema';
import { Repository } from 'typeorm';
import { Category } from '../entities/index';

export type TCategoryCreate = z.infer<typeof categoryCreateSchema>;
export type TCategoryRead = z.infer<typeof categoryReadSchema>;
export type TCategoryRepo = Repository<Category>;
