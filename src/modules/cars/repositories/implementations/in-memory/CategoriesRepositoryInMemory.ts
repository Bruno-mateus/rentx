/* eslint-disable linebreak-style */
import { Category } from '../../../infra/typeorm/entities/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from '../../../infra/typeorm/repositories/ICategoriesRepository';
// eslint-disable-next-line linebreak-style

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
  async list(): Promise<Category[]> {
    const listCategories = this.categories;
    return listCategories;
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();
    Object.assign(category, { name, description });
    this.categories.push(category);
  }
}