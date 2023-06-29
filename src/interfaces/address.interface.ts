import { z } from 'zod';
import { addressStateCreateSchema } from '../schemas/address.schema';
import { Repository } from 'typeorm';
import { Address } from '../entities';

export type TAddressCreate = z.infer<typeof addressStateCreateSchema>;
export type TAddressRepo = Repository<Address>;
