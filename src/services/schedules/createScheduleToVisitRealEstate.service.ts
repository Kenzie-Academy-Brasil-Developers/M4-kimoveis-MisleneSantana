import { RealEstate, User } from '../../entities';
import { AppError } from '../../errors/error';
import { TScheduleCreate } from '../../interfaces/schedule.interface';
import { realEstateRepo, scheduleRepo, userRepo } from '../../repositories';

export const createScheduleToVisitRealEstateService = async (
  { realEstateId, ...scheduleData }: TScheduleCreate,
  userId: number
): Promise<object> => {
  const realEstateFound: RealEstate | null = await realEstateRepo.findOne({
    where: { id: realEstateId },
    relations: { address: true },
  });

  if (!realEstateFound) throw new AppError('RealEstate not found', 404);
  await realEstateRepo.save(realEstateFound);

  const user: User = (await userRepo.findOneBy({ id: userId }))!;
  await scheduleRepo.save({
    ...scheduleData,
    user,
    realEstate: realEstateFound,
  });

  return { message: 'Schedule created' };
};
