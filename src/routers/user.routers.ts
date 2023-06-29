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

userRouter.post('', validateBodyMiddleware(userCreateSchema), verifyUserEmailExistsMiddleware, createUserController);

userRouter.get('', verifyTokenMiddleware, verifyUserPermissionMiddleware, veriFyIsAdminMiddleware, readUsersController);

userRouter.use('/:id', verifyUserIdExistsMiddleware);

userRouter.patch(
  '/:id',
  validateBodyMiddleware(userUpdateSchema),
  verifyTokenMiddleware,
  verifyUserPermissionMiddleware,
  updateUserController
);

userRouter.delete('/:id', verifyTokenMiddleware, veriFyIsAdminMiddleware, deleteUserController);
