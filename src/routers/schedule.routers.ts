import { Router } from 'express';
import { verifyTokenMiddleware } from '../middlewares/verifyToken.middleware';
import { createScheduleToVisitRealEstateController } from '../controllers/schedule/createScheduleToVisitRealEstate.controller';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware';
import { scheduleCreateSchema } from '../schemas/schedule.schema';

export const scheduleRouter: Router = Router();

// 1 - Agenda uma visita a um imóvel (Qualquer usuário, obrigatório token)
scheduleRouter.post(
  '',
  verifyTokenMiddleware,
  validateBodyMiddleware(scheduleCreateSchema),
  createScheduleToVisitRealEstateController
);

// 2 - lista todos os agendamentos de um imóvel (Apenas Administradores)
scheduleRouter.get('/realEstate/:id');
