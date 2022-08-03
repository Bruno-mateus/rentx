import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUserUseCase } from "./ResetPasswordUseruseCase";

export class ResetPasswordUserController {
  constructor() {
  }
  async handle(req: Request, res: Response): Promise<Response> {

    const { token } = req.query;
    const { password } = req.body;

    const resetPasswordUseCase = container.resolve(
      ResetPasswordUserUseCase
    )

    await resetPasswordUseCase.execute({ token: String(token), password })

    return res.send()
  }
}