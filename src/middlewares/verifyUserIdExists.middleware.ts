import { NextFunction, Request, Response } from 'express';
import { TUserRepo } from '../interfaces/user.interfaces';
import { AppDataSource } from '../data-source';
import { User } from '../entities';
import { AppError } from '../errors/error';

export const verifyUserIdExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId: number = Number(req.params.id);

  const userRepo: TUserRepo = AppDataSource.getRepository(User);
  const userFound: User | null = await userRepo.findOneBy({ id: userId });

  if (!userFound) throw new AppError('User not found', 404);

  res.locals = { ...res.locals, userFound };

  return next();
};
