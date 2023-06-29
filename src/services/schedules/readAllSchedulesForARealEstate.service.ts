import { AppDataSource } from '../../data-source';
import { RealEstate } from '../../entities';
import { AppError } from '../../errors/error';
import { TRealEstateRepo } from '../../interfaces/realEstate.interface';

export const readAllSchedulesForARealEstate = async (realEstateId: number): Promise<RealEstate | null> => {
  const realEstateRepo: TRealEstateRepo = AppDataSource.getRepository(RealEstate);
  const realEstate = await realEstateRepo.findOne({
    where: { id: realEstateId },
    relations: { schedules: true, address: true, category: true },
  });

  if (!realEstate) throw new AppError('RealEstate not found', 404);

  return realEstate;
};
