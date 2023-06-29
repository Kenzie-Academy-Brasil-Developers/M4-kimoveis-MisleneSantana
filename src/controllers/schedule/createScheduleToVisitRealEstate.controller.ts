import { Request, Response } from 'express';
import { Schedule } from '../../entities';
import { createScheduleToVisitRealEstateService } from '../../services/schedules/createScheduleToVisitRealEstate.service';

export const createScheduleToVisitRealEstateController = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = Number(res.locals.decoded.sub);
  const newSchedule: Schedule = await createScheduleToVisitRealEstateService(req.body, userId);

  return res.status(201).json(newSchedule);
};
