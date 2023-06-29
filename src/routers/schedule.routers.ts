import { Router } from 'express';
import { verifyTokenMiddleware } from '../middlewares/verifyToken.middleware';
import { createScheduleToVisitRealEstateController } from '../controllers/schedule/createScheduleToVisitRealEstate.controller';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware';
import { scheduleCreateSchema } from '../schemas/schedule.schema';
import { validateScheduleMiddleware } from '../middlewares/validateSchedule.middleware';
import { readAllSchedulesForARealEstateController } from '../controllers/schedule/readAllSchedulesForARealEstate.controller';
import { veriFyIsAdminMiddleware } from '../middlewares/verifyIsAdmin.middleware';

export const scheduleRouter: Router = Router();

scheduleRouter.post(
  '',
  verifyTokenMiddleware,
  validateBodyMiddleware(scheduleCreateSchema),
  validateScheduleMiddleware,
  createScheduleToVisitRealEstateController
);

scheduleRouter.get(
  '/realEstate/:id',
  verifyTokenMiddleware,
  veriFyIsAdminMiddleware,
  readAllSchedulesForARealEstateController
);
