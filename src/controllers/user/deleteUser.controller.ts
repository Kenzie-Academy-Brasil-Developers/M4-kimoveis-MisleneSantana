import { Request, Response } from 'express';
import { deleteUserService } from '../../services/users/deleteUser.service';

export const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
  await deleteUserService(res.locals.userFound);
  return res.status(204).send();
};
