import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadImageCarUseCase } from "./UploadImageCarController";

interface IFileName {
  filename: string
}

export class UploadCarImageController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const images = req.files as IFileName[];

    const uploadCarImageUseCase = container.resolve(UploadImageCarUseCase)
    const fileNames = images.map(file => file.filename)

    await uploadCarImageUseCase.execute({ car_id: id, image_name: fileNames })

    return res.status(201).send();
  }
}