import { Router } from 'express';
import { createRealEstateController } from '../controllers/realState/createRealEstate.controller';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware';
import { realEstateCreateSchema } from '../schemas/realEstate.schema';
import { verifyIfTheAddressExistsMiddleware } from '../middlewares/verifyIfTheAddressExists.middleware';
import { veriFyIsAdminMiddleware } from '../middlewares/verifyIsAdmin.middleware';
import { verifyTokenMiddleware } from '../middlewares/verifyToken.middleware';
import { readAllRealEstateController } from '../controllers/realState/readAllRealEstate.controller';

export const realStateRouter: Router = Router();

// 1 - Criação de um imóvel (Apenas Administradores)
realStateRouter.post(
  '',
  verifyTokenMiddleware,
  veriFyIsAdminMiddleware,
  validateBodyMiddleware(realEstateCreateSchema),
  verifyIfTheAddressExistsMiddleware,
  createRealEstateController
);

// 2 - Lista todos os imóveis (Qualquer usuário, não necessita token)
realStateRouter.get('', readAllRealEstateController);
