import { Request, Response } from 'express';
import { createScheduleToVisitRealEstateService } from '../../services/schedules/createScheduleToVisitRealEstate.service';

export const createScheduleToVisitRealEstateController = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = Number(res.locals.decoded.sub);
  const newSchedule: object = await createScheduleToVisitRealEstateService(req.body, userId);

  return res.status(201).json(newSchedule);
};
