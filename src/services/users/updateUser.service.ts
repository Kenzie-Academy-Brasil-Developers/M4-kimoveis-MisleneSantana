import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { TUserRepo, TUserReturn, TUserUpdate } from '../../interfaces/user.interfaces';
import { userReturnSchema } from '../../schemas/user.schema';

export const updateUserService = async (userFound: User, userData: TUserUpdate): Promise<TUserReturn> => {
  const userRepo: TUserRepo = AppDataSource.getRepository(User);
  const userUpdated: User = userRepo.create({ ...userFound, ...userData });
  await userRepo.save(userUpdated);

  return userReturnSchema.parse(userUpdated);
};
