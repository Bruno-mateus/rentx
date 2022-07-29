import { Router } from 'express';
import { RefreshTokenController } from '../../../../modules/users/UseCases/RefresehToken/RefreshTokenController';

import { AuthenticateController } from '../../../../modules/users/UseCases/AuthenticateUseCase/AuthenticateController';

export const authenticateRoutes = Router();
const authenticateController = new AuthenticateController();
const refreshController = new RefreshTokenController()

authenticateRoutes.post('/sessions', authenticateController.handle);

authenticateRoutes.post('/refresh-token', refreshController.handle);