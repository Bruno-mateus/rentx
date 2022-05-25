import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { carsRoutes } from './cars.routes';
import catergoriesRoutes from './categories.routes';
import specificationRoutes from './specifications.routes';
import userRoutes from './user.routes';

export const router = Router();

router.use('/categories', catergoriesRoutes);
router.use('/specification', specificationRoutes);
router.use('/user', userRoutes);
router.use(authenticateRoutes); // /sessions
router.use('/car', carsRoutes);
