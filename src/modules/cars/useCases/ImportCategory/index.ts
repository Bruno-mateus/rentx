import CategoriesRepository from '../../repositories/implemetations/CategoriesRepository';
import ImportCategoryController from './ImportCategoryController';
import ImportCategoryUseCase from './ImportCategoryUseCase';

const categoriesReposistory = null;
const importCategoryUseCase = new ImportCategoryUseCase(categoriesReposistory);
export const importCategoryController = new ImportCategoryController(importCategoryUseCase);
