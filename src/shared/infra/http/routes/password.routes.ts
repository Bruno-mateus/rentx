import { Router } from "express";
import { SendForgotPasswordController } from '../../../../modules/users/UseCases/SendForgotPassworUseCase/SendForgotPasswordController'


export const passRoutes = Router();

const sendForgotPasswordController = new SendForgotPasswordController()

passRoutes.post('/forgot', sendForgotPasswordController.handle)