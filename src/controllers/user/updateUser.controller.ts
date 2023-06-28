import { Request, Response } from 'express';
import { TUserReturn, TUserUpdate } from '../../interfaces/user.interfaces';
import { User } from '../../entities';
import { updateUserService } from '../../services/users/updateUser.service';

export const updateUserController = async (req: Request, res: Response): Promise<Response> => {
  const userFound: User = res.locals.userFound;
  const userData: TUserUpdate = req.body;

  const user: TUserReturn = await updateUserService(userFound, userData);
  return res.status(200).json(user);
};
