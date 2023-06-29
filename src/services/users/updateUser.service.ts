import { User } from '../../entities';
import { TUserReturn, TUserUpdate } from '../../interfaces/user.interfaces';
import { userRepo } from '../../repositories';
import { userReturnSchema } from '../../schemas/user.schema';

export const updateUserService = async (userFound: User, userData: TUserUpdate): Promise<TUserReturn> => {
  const userUpdated: User = userRepo.create({ ...userFound, ...userData });
  await userRepo.save(userUpdated);

  return userReturnSchema.parse(userUpdated);
};
