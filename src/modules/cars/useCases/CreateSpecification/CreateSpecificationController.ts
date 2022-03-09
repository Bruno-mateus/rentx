import { Request, Response } from 'express';

import CreateSpecificationUseCase from './CreateSpecificationUseCase';

export default class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) { }

  handle(req: Request, res: Response) {
    const { name, description } = req.body;

    this.createSpecificationUseCase.exec({ name, description });

    return res.status(201).send();
  }
}
