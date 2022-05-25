import { Router } from 'express';
import { CreateCarController } from '../../../../modules/cars/UseCases/CreateCars/CreateCarController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import ensureAutheticated from '../middlewares/ensureAuthenticated';

export const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post('/', ensureAutheticated, ensureAdmin, createCarController.handle);
