import { Response, Request } from 'express';

import ListCategoriesUseCase from './ListCategoriesUseCase';

export default class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) { }

  handle(req: Request, res: Response): Response {
    const listCategories = this.listCategoriesUseCase.execute();

    return res.json(listCategories);
  }
}
