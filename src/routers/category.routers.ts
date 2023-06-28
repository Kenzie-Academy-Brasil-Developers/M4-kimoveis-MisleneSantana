import { Router } from 'express';
import { createCategoryController } from '../controllers/category/createCategory.controller';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware';
import { categoryCreateSchema } from '../schemas/category.schema';
import { verifyCategoryExistsMiddleware } from '../middlewares/verifyCategoryExists.middleware';
import { verifyTokenMiddleware } from '../middlewares/verifyToken.middleware';
import { veriFyIsAdminMiddleware } from '../middlewares/verifyIsAdmin.middleware';
import { readCategoriesController } from '../controllers/category/readCategories.controller';
import { readAllRealStateFromCategoryController } from '../controllers/category/readPropertiesByCategory.controller';

export const categoryRouter: Router = Router();

// 1 - Criação de categoria (Apenas Administradores)
categoryRouter.post(
  '',
  verifyTokenMiddleware,
  veriFyIsAdminMiddleware,
  validateBodyMiddleware(categoryCreateSchema),
  verifyCategoryExistsMiddleware,
  createCategoryController
);

// 2 - Lista todas as categorias (Qualquer usuário, não necessita token)
categoryRouter.get('', readCategoriesController);

// 3 - Lista todos imóveis que pertencem a uma categoria (Qualquer usuário, não necessita token)
categoryRouter.get('/:id/realEstate', readAllRealStateFromCategoryController);
