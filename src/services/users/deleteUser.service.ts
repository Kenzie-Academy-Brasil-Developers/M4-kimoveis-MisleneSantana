import { User } from '../../entities';
import { userRepo } from '../../repositories';

export const deleteUserService = async (userFound: User): Promise<void> => {
  await userRepo.softRemove(userFound);
};
