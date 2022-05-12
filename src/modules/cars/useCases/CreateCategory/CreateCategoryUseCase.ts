// eslint-disable-next-line quotes
import { inject, injectable } from "tsyringe";

import AppError from '../../../../shared/errors/AppError';
import { ICategoriesRepository } from '../../infra/typeorm/repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}
@injectable()
export default class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) { }

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) throw new AppError('Category already exists');

    await this.categoriesRepository.create({ name, description });
  }
}
