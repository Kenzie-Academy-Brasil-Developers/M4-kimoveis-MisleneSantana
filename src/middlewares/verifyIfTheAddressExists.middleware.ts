import { NextFunction, Request, Response } from 'express';
import { TAddressRepo } from '../interfaces/address.interface';
import { AppDataSource } from '../data-source';
import { Address } from '../entities';
import { AppError } from '../errors/error';

export const verifyIfTheAddressExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { street, zipCode, city, state, number } = req.body.address;

  const addressRepo: TAddressRepo = AppDataSource.getRepository(Address);
  const newAddress = await addressRepo.findOneBy({ street, zipCode, city, state, number: number || '' });

  if (newAddress) {
    throw new AppError('Address already exists', 409);
  }

  return next();
};
