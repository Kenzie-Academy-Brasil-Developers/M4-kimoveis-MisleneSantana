import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { TUserRead, TUserRepo } from '../../interfaces/user.interfaces';
import { userReadSchema } from '../../schemas/user.schema';

export const readUsersService = async (): Promise<TUserRead> => {
  const userRepo: TUserRepo = AppDataSource.getRepository(User);
  return userReadSchema.parse(await userRepo.find());
};
