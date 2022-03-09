import { Router } from 'express';

import catergoriesRoutes from './categories.routes';
import specificationRoutes from './specifications.routes';

export const router = Router();

router.use('/categories', catergoriesRoutes);
router.use('/specification', specificationRoutes);
