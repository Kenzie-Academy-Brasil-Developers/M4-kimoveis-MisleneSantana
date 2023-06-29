import { User } from '../../entities/index';
import { TUserCreate, TUserReturn } from '../../interfaces/user.interfaces';
import { userRepo } from '../../repositories';
import { userReturnSchema } from '../../schemas/user.schema';

export const createUserService = async (userData: TUserCreate): Promise<TUserReturn> => {
  const user: User = userRepo.create(userData);

  await userRepo.save(user);

  return userReturnSchema.parse(user);
};
