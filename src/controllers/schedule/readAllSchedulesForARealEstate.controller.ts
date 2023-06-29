import { Request, Response } from 'express';
import { readAllSchedulesForARealEstate } from '../../services/schedules/readAllSchedulesForARealEstate.service';

export const readAllSchedulesForARealEstateController = async (req: Request, res: Response): Promise<Response> => {
  const realEstateId: string = req.params.id;

  const allSchedulesFromRealEstate = await readAllSchedulesForARealEstate(Number(realEstateId));
  return res.status(200).json(allSchedulesFromRealEstate);
};
