import { Router } from "express"
import { CreateUserController } from "../modules/users/UseCases/CreateUser/CreateUserController"


const userRoutes = Router()

const createUserController = new CreateUserController()

userRoutes.post('/', createUserController.handle)

export default userRoutes