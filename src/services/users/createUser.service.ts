import { AppDataSource } from '../../data-source';
import { User } from '../../entities/index';
import { TUserCreate, TUserRepo, TUserReturn } from '../../interfaces/user.interfaces';
import { userReturnSchema } from '../../schemas/user.schema';

export const createUserService = async (userData: TUserCreate): Promise<TUserReturn> => {
  const userRepo: TUserRepo = AppDataSource.getRepository(User);
  const user: User = userRepo.create(userData);

  await userRepo.save(user);

  return userReturnSchema.parse(user);
};
