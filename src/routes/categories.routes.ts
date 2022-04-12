import { Router } from 'express';
import multer from 'multer';

import CreateCategoryController from '../modules/cars/useCases/CreateCategory/CreateCategoryController';
import ImportCategoryController from '../modules/cars/useCases/ImportCategory/ImportCategoryController';
import ListCategoriesController from '../modules/cars/useCases/ListCategories/ListCategoriesController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
// upload com pasta de arquivos temporario
const upload = multer({
  dest: './temp',
});

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController()

const importCategoryController = new ImportCategoryController()

const listCategoryController = new ListCategoriesController()

categoriesRoutes.post('/', createCategoryController.handle);

//test
categoriesRoutes.use(ensureAuthenticated)

// (single) -> upload de apenas um arquivo
categoriesRoutes.post('/categories/import', upload.single('file'), importCategoryController.handle);


categoriesRoutes.get('/', listCategoryController.handle);

export default categoriesRoutes;
