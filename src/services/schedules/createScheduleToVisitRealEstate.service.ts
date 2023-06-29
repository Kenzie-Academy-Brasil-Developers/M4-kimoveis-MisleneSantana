import { AppDataSource } from '../../data-source';
import { RealEstate, Schedule, User } from '../../entities';
import { AppError } from '../../errors/error';
import { TRealEstateRepo } from '../../interfaces/realEstate.interface';
import { TScheduleCreate, TScheduleRepo, TScheduleReturn } from '../../interfaces/schedule.interface';
import { TUserRepo } from '../../interfaces/user.interfaces';

export const createScheduleToVisitRealEstateService = async (
  { realEstateId, ...scheduleData }: TScheduleCreate,
  userId: number
): Promise<Schedule> => {
  const realEstateRepo: TRealEstateRepo = AppDataSource.getRepository(RealEstate);
  const realEstate: RealEstate | null = await realEstateRepo.findOneBy({ id: realEstateId });

  if (!realEstate) throw new AppError('RealEstate not found', 404);

  const userRepo: TUserRepo = AppDataSource.getRepository(User);
  const user: User = (await userRepo.findOneBy({ id: userId }))!;

  const scheduleRepo: TScheduleRepo = AppDataSource.getRepository(Schedule);
  const schedule: Schedule = scheduleRepo.create({
    ...scheduleData,
    user,
    realEstate,
  });

  return await scheduleRepo.save(schedule);
};
