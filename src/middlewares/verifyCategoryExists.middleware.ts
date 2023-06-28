import { NextFunction, Request, Response } from 'express';
import { Category } from '../entities/index';
import { AppDataSource } from '../data-source';
import { AppError } from '../errors/error';

export const verifyCategoryExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name } = req.body;

  if (!name) return next();

  const categoryRepo = AppDataSource.getRepository(Category);
  const foundCategory: Category | null = await categoryRepo.findOneBy({ name });

  if (foundCategory) throw new AppError('Category already exists', 409);

  return next();
};
