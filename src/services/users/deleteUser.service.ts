import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { TUserRepo } from '../../interfaces/user.interfaces';

export const deleteUserService = async (userFound: User): Promise<void> => {
  const userRepo: TUserRepo = AppDataSource.getRepository(User);
  await userRepo.softRemove(userFound);
};
