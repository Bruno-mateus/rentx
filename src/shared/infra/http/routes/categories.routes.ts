import { Router } from 'express';
import multer from 'multer';

import CreateCategoryController from '../../../../modules/cars/UseCases/CreateCategory/CreateCategoryController';
import ImportCategoryController from '../../../../modules/cars/UseCases/ImportCategory/ImportCategoryController';
import ListCategoriesController from '../../../../modules/cars/UseCases/ListCategories/ListCategoriesController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import ensureAutheticated from '../middlewares/ensureAuthenticated';
// upload com pasta de arquivos temporario
const upload = multer({
  dest: './temp',
});

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();

const importCategoryController = new ImportCategoryController();

const listCategoryController = new ListCategoriesController();

categoriesRoutes.post('/', ensureAutheticated, ensureAdmin, createCategoryController.handle);



// (single) -> upload de apenas um arquivo
categoriesRoutes.post('/categories/import', ensureAutheticated, ensureAdmin, upload.single('file'), importCategoryController.handle);

categoriesRoutes.get('/', listCategoryController.handle);

export default categoriesRoutes;
