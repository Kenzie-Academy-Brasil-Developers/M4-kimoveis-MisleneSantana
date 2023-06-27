import { compare } from 'bcryptjs';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities/index';
import { AppError } from '../../errors/error';
import { TSessionLoginCreate, TSessionLoginReturn } from '../../interfaces/session.interface';
import { TUserRepo } from '../../interfaces/user.interfaces';
import { sign } from 'jsonwebtoken';

export const sessionLoginService = async (userData: TSessionLoginCreate): Promise<TSessionLoginReturn> => {
  const userRepo: TUserRepo = AppDataSource.getRepository(User);
  const user: any = await userRepo.findOneBy({ email: userData.email });

  if (!user) {
    throw new AppError('Wrong email/password', 401);
  }
  const matchPassword: boolean = await compare(userData.password, user.password);

  if (!matchPassword) {
    throw new AppError('Wrong email/password', 401);
  }

  const token: string = sign(
    {
      admin: user.admin,
    },
    String(process.env.SECRET_KEY),
    {
      subject: user.id.toString(),
      expiresIn: process.env.EXPIRES_IN,
    }
  );

  return { token };
}
