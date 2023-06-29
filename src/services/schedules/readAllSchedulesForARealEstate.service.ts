import { RealEstate } from '../../entities';
import { AppError } from '../../errors/error';
import { realEstateRepo } from '../../repositories';

export const readAllSchedulesForARealEstate = async (realEstateId: number): Promise<RealEstate | null> => {
  const realEstate: RealEstate | null = await realEstateRepo.findOne({
    where: { id: realEstateId },
    relations: {
      address: true,
      category: true,
      schedules: {
        user: true,
      },
    },
  });

  if (!realEstate) throw new AppError('RealEstate not found', 404);

  return realEstate;
};
