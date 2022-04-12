
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'

import swaggerUI from 'swagger-ui-express';
import swaggerFile from './swagger.json';
import AppError from './errors/AppError';

import { router } from './routes';

import './database'
import './shared/container'


const app = express();

app.use(express.json());

app.use(router);

app.use(
  (err: Error, _: Request, res: Response, next: NextFunction) => {
    //return our error handled
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({

        message: err.message

      })

    }
    //default app error
    return res.status(500).json({
      status: "error",
      message: `Internal Server Error - ${err.message}`
    })
  }

)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.listen(3000, () => console.log('Server is run in http://localhost:3000'));
