import { z } from 'zod';
import { realEstateCreateSchema, realEstateReadSchema } from '../schemas/realEstate.schema';
import { Repository } from 'typeorm';
import { RealEstate } from '../entities';

export type TRealEstateCreate = z.infer<typeof realEstateCreateSchema>;
// export type TRealEstateRead = z.infer<typeof realEstateReadSchema>;
export type TRealEstateRead = Array<RealEstate>;
export type TRealEstateRepo = Repository<RealEstate>;
