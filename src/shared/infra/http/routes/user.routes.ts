import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';
import { CreateUserController } from '../../../../modules/users/UseCases/CreateUser/CreateUserController';
import { UpdateUserAvatarController } from '../../../../modules/users/UseCases/UpdateUserAvatar/UpadateUserAvatarController';
import ensureAutheticated from '../middlewares/ensureAuthenticated';

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./temp/avatar'));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoutes.post('/', createUserController.handle);

userRoutes.patch(
  '/avatar',
  ensureAutheticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
);

export default userRoutes;
