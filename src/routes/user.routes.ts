
import multer from "multer"
import { Router } from "express"

import ensureAutheticated from "../middlewares/ensureAuthenticated"
import uploadConfig from '../config/upload'
import { UpdateUserAvatarController } from "../modules/users/UseCases/UpdateUserAvatar/UpadateUserAvatarController"
import { CreateUserController } from "../modules/users/UseCases/CreateUser/CreateUserController"


const userRoutes = Router()

const uploadAvatar = multer(uploadConfig.upload('./temp/avatar'))

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()


userRoutes.post('/', createUserController.handle)

userRoutes.patch('/avatar',
  ensureAutheticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
)

export default userRoutes