import { Request, Response } from "express"
import { container } from "tsyringe"
import { AuthenticateUseCase } from "./AuthenticateUseCase"

export class AuthenticateController {

  async handle(req: Request, res: Response) {
    const { email, password } = req.body

    const authenticateUseCase = container.resolve(AuthenticateUseCase)

    const token = await authenticateUseCase.execute({ email, password })

    return res.json(token)
  }
}