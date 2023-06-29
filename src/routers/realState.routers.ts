import { Router } from 'express';
import { createRealEstateController } from '../controllers/realEstate/createRealEstate.controller';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware';
import { realEstateCreateSchema } from '../schemas/realEstate.schema';
import { verifyIfTheAddressExistsMiddleware } from '../middlewares/verifyIfTheAddressExists.middleware';
import { veriFyIsAdminMiddleware } from '../middlewares/verifyIsAdmin.middleware';
import { verifyTokenMiddleware } from '../middlewares/verifyToken.middleware';
import { readAllRealEstateController } from '../controllers/realEstate/readAllRealEstate.controller';

export const realStateRouter: Router = Router();

realStateRouter.post(
  '',
  verifyTokenMiddleware,
  veriFyIsAdminMiddleware,
  validateBodyMiddleware(realEstateCreateSchema),
  verifyIfTheAddressExistsMiddleware,
  createRealEstateController
);

realStateRouter.get('', readAllRealEstateController);
