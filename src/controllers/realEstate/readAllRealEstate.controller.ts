import { Request, Response } from 'express';
import { readAllRealEstateService } from '../../services/realEstate/readAllRealEstate.service';
import { TRealEstateRead } from '../../interfaces/realEstate.interface';

export const readAllRealEstateController = async (req: Request, res: Response): Promise<Response> => {
  const allRealEstate: TRealEstateRead = await readAllRealEstateService();
  return res.status(200).json(allRealEstate);
};
