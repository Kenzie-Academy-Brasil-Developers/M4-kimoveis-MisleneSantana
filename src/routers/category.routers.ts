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

categoryRouter.post(
  '',
  verifyTokenMiddleware,
  veriFyIsAdminMiddleware,
  validateBodyMiddleware(categoryCreateSchema),
  verifyCategoryExistsMiddleware,
  createCategoryController
);

categoryRouter.get('', readCategoriesController);

categoryRouter.get('/:id/realEstate', readAllRealStateFromCategoryController);
