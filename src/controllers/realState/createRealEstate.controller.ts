import { Request, Response } from 'express';
import { RealEstate } from '../../entities';
import { createRealEstateService } from '../../services/realEstate/createRealEstate.service';

export const createRealEstateController = async (req: Request, res: Response): Promise<Response> => {
  const newRealEstate: RealEstate = await createRealEstateService(req.body);
  return res.status(201).json(newRealEstate);
};
