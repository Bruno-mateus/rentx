import 'reflect-metadata';
// eslint-disable-next-line import-helpers/order-imports
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import swaggerUI from 'swagger-ui-express';

import swaggerFile from '../../../swagger.json';
import AppError from '../../errors/AppError';
import createConnection from '../typeorm';
import { router } from './routes';

import '../../container';

createConnection();
const app = express();

app.use(express.json());

app.use(router);

app.use(
  (err: Error, _: Request, res: Response, next: NextFunction) => {
    // return our error handled
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({

        message: err.message,

      });
    }
    console.log(err)
    // default app error
    return res.status(500).json({
      status: 'error',
      message: `Internal Server Error - ${err.message}`,
    });
  },

);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.listen(3000, () => console.log('Server is run in http://localhost:3000'));
