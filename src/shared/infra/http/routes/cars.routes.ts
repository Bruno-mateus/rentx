import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';
import { CreateSpecificationCarController } from '../../../../modules/cars/UseCases/SpecificationCars/CreateSpecificationCarController'
import { CreateCarController } from '../../../../modules/cars/UseCases/CreateCars/CreateCarController';
import { ListCarsController } from '../../../../modules/cars/UseCases/ListCars/ListCarsController';
import { UploadCarImageController } from '../../../../modules/cars/UseCases/UpluadImageCarUseCase/UpluadImageCarUseCase';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import ensureAutheticated from '../middlewares/ensureAuthenticated';



export const carsRoutes = Router();
const upload = multer(uploadConfig.upload('./temp/cars'));
const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createSpecificationCarController = new CreateSpecificationCarController();
const uploadCarImageController = new UploadCarImageController()

carsRoutes.post('/', ensureAutheticated, ensureAdmin, createCarController.handle);

carsRoutes.get('/available', listCarsController.handle);

carsRoutes.post('/specifications/:id', ensureAutheticated, ensureAdmin, createSpecificationCarController.handle)

carsRoutes.post('/images/:id', ensureAutheticated, ensureAdmin, upload.array('images'), uploadCarImageController.handle)