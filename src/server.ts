import express from 'express';
import swaggerUI from 'swagger-ui-express';

import { router } from './routes';
import categoriesRoutes from './routes/categories.routes';
import swaggerFile from './swagger.json';
import './database'

const app = express();

app.use(express.json());

app.use(router);

app.use(categoriesRoutes);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.listen(3000, () => console.log('Server is run in http://localhost:3000'));
