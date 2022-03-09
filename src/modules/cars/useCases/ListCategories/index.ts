import CategoriesRepository from '../../repositories/implemetations/CategoriesRepository';
import ListCategoriesController from './ListCategoriesController';
import ListCategoriesUseCase from './ListCategoriesUseCase';

const categoriesRepository = null;

const listCategoryUseCase = new ListCategoriesUseCase(categoriesRepository);

export const listCategoryController = new ListCategoriesController(listCategoryUseCase);
