import { Request, Response } from 'express';
import { createUserService } from '../../services/users/createUser.service';
import { TUserReturn } from '../../interfaces/user.interfaces';

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
  const newUser: TUserReturn = await createUserService(req.body);
  return res.status(201).json(newUser);
};
