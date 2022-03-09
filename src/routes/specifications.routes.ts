import { Router } from 'express';

import { createSpecificationController } from '../modules/cars/useCases/CreateSpecification';

const specificationRoutes = Router();

specificationRoutes.post('/', (req, res) => createSpecificationController.handle(req, res));

export default specificationRoutes;
