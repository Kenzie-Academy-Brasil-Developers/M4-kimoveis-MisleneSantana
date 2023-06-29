import { NextFunction, Request, Response } from 'express';
import { TScheduleCreate, TScheduleRepo } from '../interfaces/schedule.interface';
import { AppDataSource } from '../data-source';
import { Schedule } from '../entities';
import { AppError } from '../errors/error';

export const validateScheduleMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const scheduleData: TScheduleCreate = req.body;
  const userId: number = Number(res.locals.decoded.sub);

  // 1. Já existe agendamento para este imóvel nesta data e hora:
  const scheduleRepo: TScheduleRepo = AppDataSource.getRepository(Schedule);
  const scheduleQueryBuilderHour: Schedule | null = await scheduleRepo
    .createQueryBuilder('schedule')
    .where('schedule.date = :date', { date: scheduleData.date })
    .andWhere('schedule.hour = :hour', { hour: scheduleData.hour })
    .andWhere('schedule.realEstate = :realEstateId', { realEstateId: scheduleData.realEstateId })
    .getOne();

  if (scheduleQueryBuilderHour)
    throw new AppError('Schedule to this real estate at this date and time already exists', 409);

  // 2. A programação do usuário para este imóvel nesta data e hora já existe:
  const scheduleQueryBuilderUser: Schedule | null = await scheduleRepo
    .createQueryBuilder('schedule')
    .where('schedule.date = :date', { date: scheduleData.date })
    .andWhere('schedule.hour = :hour', { hour: scheduleData.hour })
    .andWhere('schedule.user = :id', { id: userId })
    .getOne();

  if (scheduleQueryBuilderUser)
    throw new AppError('User schedule to this real estate at this date and time already exists', 409);

  // 3. Validate hours:
  const allowedHour: number = Number(scheduleData.hour.split(':')[0]);
  if (allowedHour < 8 || allowedHour > 18) throw new AppError('Invalid hour, available times are 8AM to 18PM', 400);

  // 4. Validate days:
  const verifyDate: number = new Date(scheduleData.date).getDay();
  if (verifyDate < 1 || verifyDate > 5) throw new AppError('Invalid date, work days are monday to friday', 400);

  return next();
};
