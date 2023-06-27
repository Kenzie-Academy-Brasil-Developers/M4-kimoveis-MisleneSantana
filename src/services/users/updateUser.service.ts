import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { TUserRepo, TUserUpdate } from '../../interfaces/user.interfaces';

export const updateUserService = async (userFound: User, userData: TUserUpdate): Promise<User> => {
  const userRepo: TUserRepo = AppDataSource.getRepository(User);

  return await userRepo.save({ ...userFound, ...userData });
};

// export const updateUserService = async (userFound: User, userData: TUserUpdate): Promise<TUserReturn> => {
//   const userRepo: TUserRepo = AppDataSource.getRepository(User);
//   const userUpdated: User = userRepo.create({ ...userFound, ...userData });
//   await userRepo.save(userUpdated);

//   return userReturnSchema.parse(userUpdated);
// };
