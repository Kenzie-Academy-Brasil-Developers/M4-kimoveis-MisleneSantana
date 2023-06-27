import { NextFunction, Request } from 'express';
import { Response } from 'supertest';
import { AppError } from '../errors/error';
import { AppDataSource } from '../data-source';

// export const verifyIdExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   const id: number = Number(req.params.id);

//   const repo: TMovieRepo = AppDataSource.getRepository(Movie);
//   const movie: Movie | null = await repo.findOneBy({ id: id });

//   if (!movie) throw new AppError('Movie not found', 404);

//   res.locals = { ...res.locals, movie };

//   return next();
// };
