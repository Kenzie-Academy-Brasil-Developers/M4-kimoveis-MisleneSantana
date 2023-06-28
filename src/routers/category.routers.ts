import { Router } from 'express';
import { verifyUserIdExistsMiddleware } from '../middlewares/verifyUserIdExists.middleware';

export const categoryRouter: Router = Router();

// 1 - Criação de categoria (Apenas Administradores)
categoryRouter.post('');

// 2 - Lista todas as categorias (Qualquer usuário, não necessita token)
categoryRouter.get('');

// Verify userId exists:
categoryRouter.use('/:id', verifyUserIdExistsMiddleware);

// 3 - Lista todos imóveis que pertencem a uma categoria (Qualquer usuário, não necessita token)
categoryRouter.get('/:id/realEstate');
