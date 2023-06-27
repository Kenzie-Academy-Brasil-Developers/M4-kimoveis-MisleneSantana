import { NextFunction, Request, Response } from 'express';
import { TUserRepo } from '../interfaces/user.interfaces';
import { AppDataSource } from '../data-source';
import { User } from '../entities';
import { AppError } from '../errors/error';

export const verifyUserEmailExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userEmail: string = req.body.email;

  if (!userEmail) {
    return next();
  }

  const userRepo: TUserRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ email: userEmail });

  if (user) {
    throw new AppError('Email already exists', 409);
  }

  return next();
};
