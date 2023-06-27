import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/error';
import { verify } from 'jsonwebtoken';

export const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authorization: string | undefined = req.headers.authorization;

  if (!authorization) {
    throw new AppError('Missing bearer token', 401);
  }

  const token: string = authorization.split(' ')[1];

  if (token === undefined) {
    throw new AppError('Missing bearer token', 401);
  }

  verify(token, String(process.env.SECRET_KEY), (error: any, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }
    res.locals = { ...res.locals, decoded };
  });

  return next();
};
