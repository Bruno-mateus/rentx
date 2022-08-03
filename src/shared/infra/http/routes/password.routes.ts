import { Router } from "express";
import { ResetPasswordUserController } from "../../../../modules/users/UseCases/ResetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordController } from '../../../../modules/users/UseCases/SendForgotPassworUseCase/SendForgotPasswordController'


export const passRoutes = Router();

const sendForgotPasswordController = new SendForgotPasswordController()
const resetPasswordUserController = new ResetPasswordUserController()

passRoutes.post('/reset', resetPasswordUserController.handle)
passRoutes.post('/forgot', sendForgotPasswordController.handle)