import { z } from 'zod';
import { addressStateCreateSchema, addressStateSchema } from './address.schema';
import { categorySchema } from './category.schema';

export const realEstateSchema = z.object({
  id: z.number().positive(),
  value: z
    .number()
    .positive()
    .default(() => 0)
    .or(z.string()),
  size: z.number().int().positive(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  address: addressStateSchema,
  category: categorySchema,
});

export const realEstateCreateSchema = z.object({
  value: z
    .number()
    .positive()
    .default(() => 0)
    .or(z.string()),
  size: z.number().int().positive(),
  address: addressStateCreateSchema,
  categoryId: z.number().int().positive(),
});

export const realEstateReadSchema = realEstateCreateSchema.array();

// export const realEstateCreateSchema = realEstateSchema
//   .omit({
//     id: true,
//     sold: true,
//     createdAt: true,
//     updatedAt: true,
//     category: true
//   })
//   .extend({
//     address: addressStateCreateSchema,
//     categoryId: z.number().int().positive(),
//   });
