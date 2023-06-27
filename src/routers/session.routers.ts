import { Router } from 'express';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware';
import { sessionLoginCreateSchema } from '../schemas/session.schema';
import { sessionLoginController } from '../controllers/session/sessionLogin.controller';

export const sessionLoginRouter: Router = Router();

sessionLoginRouter.post('', validateBodyMiddleware(sessionLoginCreateSchema), sessionLoginController);
