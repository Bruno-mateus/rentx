import { Router } from 'express';

import CreateSpecificationController from '../../../../modules/cars/UseCases/CreateSpecification/CreateSpecificationController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import ensureAutheticated from '../middlewares/ensureAuthenticated';

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.post('/', ensureAutheticated, ensureAdmin, createSpecificationController.handle);

export default specificationRoutes;
