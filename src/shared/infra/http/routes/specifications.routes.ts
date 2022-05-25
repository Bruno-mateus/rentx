import { Router } from 'express';

import CreateSpecificationController from '../../../../modules/cars/UseCases/CreateSpecification/CreateSpecificationController';

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.post('/', createSpecificationController.handle);

export default specificationRoutes;
