import { Router } from 'express';

import { AuthenticateController } from '../../../../modules/users/UseCases/AuthenticateUseCase/AuthenticateController';

export const authenticateRoutes = Router();
const authenticateController = new AuthenticateController();

authenticateRoutes.post('/sessions', authenticateController.handle);
