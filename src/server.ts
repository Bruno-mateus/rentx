
import 'reflect-metadata';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerFile from './swagger.json';

import { router } from './routes';

import './database'
import './shared/container'

const app = express();

app.use(express.json());

app.use(router);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.listen(3000, () => console.log('Server is run in http://localhost:3000'));
