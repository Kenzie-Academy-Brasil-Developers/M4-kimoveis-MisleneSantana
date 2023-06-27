import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/error';

export const verifyUserPermissionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.body;
  const { sub, admin } = res.locals.decoded;

  if (admin) return next();

  if (id != sub) {
    throw new AppError('Insufficient permission', 403);
  }
  return next();
};
