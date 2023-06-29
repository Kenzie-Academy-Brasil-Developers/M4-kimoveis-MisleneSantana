import { TUserRead } from '../../interfaces/user.interfaces';
import { userRepo } from '../../repositories';
import { userReadSchema } from '../../schemas/user.schema';

export const readUsersService = async (): Promise<TUserRead> => {
  return userReadSchema.parse(await userRepo.find());
};
