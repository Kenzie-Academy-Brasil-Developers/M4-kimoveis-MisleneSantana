import { NextFunction, Request, Response } from 'express';
import { TScheduleRepo } from '../interfaces/schedule.interface';
import { AppDataSource } from '../data-source';
import { Schedule } from '../entities';

export const validateHourMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const scheduleRepo: TScheduleRepo = AppDataSource.getRepository(Schedule);
  const scheduleQueryBuilder = scheduleRepo.createQueryBuilder('schedule');
  await scheduleQueryBuilder
    .select('schedule.hour')
    // .from('Schedule', 'schedule')
    .getRawOne();

  // const hour: number = Number(scheduleQueryBuilder.split(':')[0]);

  return next();
};
