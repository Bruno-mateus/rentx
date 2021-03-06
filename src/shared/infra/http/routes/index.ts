import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { carsRoutes } from './cars.routes';
import catergoriesRoutes from './categories.routes';
import { rentalRoutes } from './rental.routes';
import specificationRoutes from './specifications.routes';
import userRoutes from './user.routes';
import { passRoutes } from './password.routes'
export const router = Router();

router.use('/categories', catergoriesRoutes);
router.use('/specification', specificationRoutes);
router.use('/user', userRoutes);
router.use(authenticateRoutes); // /sessions
router.use('/cars', carsRoutes);
router.use('/rentals', rentalRoutes)
router.use('/password', passRoutes)