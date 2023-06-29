import { AppDataSource } from '../../data-source';
import { RealEstate, Schedule, User } from '../../entities';
import { AppError } from '../../errors/error';
import { TRealEstateRepo } from '../../interfaces/realEstate.interface';
import { TScheduleCreate, TScheduleRepo } from '../../interfaces/schedule.interface';
import { TUserRepo } from '../../interfaces/user.interfaces';

export const createScheduleToVisitRealEstateService = async (
  { realEstateId, ...scheduleData }: TScheduleCreate,
  userId: number
): Promise<Schedule> => {
  const realEstateRepo: TRealEstateRepo = AppDataSource.getRepository(RealEstate);
  const realEstateFound: RealEstate | null = await realEstateRepo.findOneBy({ id: realEstateId });

  if (!realEstateFound) throw new AppError('RealEstate not found', 404);

  await realEstateRepo.save(realEstateFound);

  const userRepo: TUserRepo = AppDataSource.getRepository(User);
  const user: User = (await userRepo.findOneBy({ id: userId }))!;

  const scheduleRepo: TScheduleRepo = AppDataSource.getRepository(Schedule);
  const schedule: Schedule = scheduleRepo.create({
    ...scheduleData,
    user,
    realEstate: realEstateFound,
  });

  const createSchedule = {
    ...schedule,
    message: 'Schedule created',
  };

  await scheduleRepo.save(createSchedule);

  return createSchedule;

  // return scheduleReturnSchema.parse(createSchedule);
};
