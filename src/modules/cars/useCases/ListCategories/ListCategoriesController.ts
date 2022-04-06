import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ListCategoriesUseCase from './ListCategoriesUseCase';

export default class ListCategoriesController {


  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)

    const listCategories = await listCategoriesUseCase.execute();

    return res.json(listCategories);
  }
}
