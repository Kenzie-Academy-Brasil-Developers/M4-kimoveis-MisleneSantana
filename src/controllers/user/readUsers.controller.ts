import { Request, Response } from 'express';
import { TUserRead } from '../../interfaces/user.interfaces';
import { readUsersService } from '../../services/users/readUsers.service';

export const readUsersController = async (req: Request, res: Response): Promise<Response> => {
  const allUsers: TUserRead = await readUsersService();
  return res.status(200).json(allUsers);
};
