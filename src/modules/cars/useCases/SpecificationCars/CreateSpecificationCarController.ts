import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSpecificationCarsUseCase } from "./CreateSpecificationCarsUseCase";

export class CreateSpecificationCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { specification_id } = req.body;

    const createCarSpecificationUseCase = container.resolve(CreateSpecificationCarsUseCase)

    const cars = await createCarSpecificationUseCase.execute({ car_id: id, specification_id })

    return res.json(cars)
  }
}