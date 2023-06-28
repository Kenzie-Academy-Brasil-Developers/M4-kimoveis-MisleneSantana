import { Router } from 'express';
import { validateBodyMiddleware } from '../middlewares/validateBody.middleware';
import { userCreateSchema, userUpdateSchema } from '../schemas/user.schema';
import { createUserController } from '../controllers/user/createUser.controller';
import { verifyUserEmailExistsMiddleware } from '../middlewares/verifyUserEmailExists.middeware';
import { readUsersController } from '../controllers/user/readUsers.controller';
import { deleteUserController } from '../controllers/user/deleteUser.controller';
import { verifyUserIdExistsMiddleware } from '../middlewares/verifyUserIdExists.middleware';
import { updateUserController } from '../controllers/user/updateUser.controller';
import { verifyTokenMiddleware } from '../middlewares/verifyToken.middleware';
import { verifyUserPermissionMiddleware } from '../middlewares/verifyUserPermission.middleware';
import { veriFyIsAdminMiddleware } from '../middlewares/verifyIsAdmin.middleware';

export const userRouter: Router = Router();

// 1 - Criação de usuário (Qualquer usuário, não necessita token)
userRouter.post('', validateBodyMiddleware(userCreateSchema), verifyUserEmailExistsMiddleware, createUserController);

// 2 - Lista todos os usuários (Apenas Administradores)
userRouter.get('', verifyTokenMiddleware, verifyUserPermissionMiddleware, veriFyIsAdminMiddleware, readUsersController);

// Verify userId exists:
userRouter.use('/:id', verifyUserIdExistsMiddleware);

// 3 - Atualiza um usuário (Apenas Administradores ou dono da conta)
userRouter.patch(
  '/:id',
  validateBodyMiddleware(userUpdateSchema),
  verifyTokenMiddleware,
  verifyUserPermissionMiddleware,
  updateUserController
);

// 4 - Realiza um soft delete no usuário (Apenas Administradores)
userRouter.delete('/:id', verifyTokenMiddleware, veriFyIsAdminMiddleware, deleteUserController);
