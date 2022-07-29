import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForogotPassWordUseCase } from "./SendForgotPasswordUseCase";

export class SendForgotPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {

    const { email } = req.body

    const sendForgotPasswordUseCase = container.resolve(SendForogotPassWordUseCase)

    await sendForgotPasswordUseCase.execute(email)

    return res.send()
  }
}