import { Router } from 'express';
import multer from 'multer';

import createCategoryController from '../modules/cars/useCases/CreateCategory/index';
import { importCategoryController } from '../modules/cars/useCases/ImportCategory/index';
import { listCategoryController } from '../modules/cars/useCases/ListCategories';
// upload com pasta de arquivos temporario
const upload = multer({
  dest: './temp',
});

const categoriesRoutes = Router();

// (single) -> upload de apenas um arquivo
categoriesRoutes.post('/import', upload.single('file'), (req, res) => importCategoryController.handle(req, res));

categoriesRoutes.post('/', (req, res) => createCategoryController().handle(req, res));

categoriesRoutes.get('/', (req, res) => listCategoryController.handle(req, res));

export default categoriesRoutes;
