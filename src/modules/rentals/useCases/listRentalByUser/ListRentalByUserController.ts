import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalByUserUseCase } from "./ListRentalByUserUseCase";


export class ListRentalByUserController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user
    const listRentalByUser = container.resolve(ListRentalByUserUseCase)

    const rentals = await listRentalByUser.execute(id)

    return res.json(rentals)
  }
}