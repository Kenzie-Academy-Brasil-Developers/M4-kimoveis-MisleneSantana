import { Request, Response } from 'express';
import { TSessionLoginCreate, TSessionLoginReturn } from '../../interfaces/session.interface';
import { sessionLoginService } from '../../services/session/sessionLogin.service';

export const sessionLoginController = async (req: Request, res: Response): Promise<Response> => {
  const userData: TSessionLoginCreate = req.body;
  const token: TSessionLoginReturn = await sessionLoginService(userData);

  return res.status(200).json(token);
};
