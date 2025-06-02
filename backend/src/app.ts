import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');

import router from './routers';
import env from './utils/env';
import publicRouter from './routers/public-router';

const app = express();

app.use(express.static('public'));
app.use(cors());

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(publicRouter);
app.use(router);

app.listen(env.PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${env.PORT}`);
  console.log(
    `Swagger Docs available at http://localhost:${env.PORT}/api-docs`
  );
});

mongoose
  .connect(env.DB_URI)
  .then((res) => {
    console.log('Database connection succeeded!');
    return res;
  })
  .catch((error) => {
    console.log({ dbConnectionError: error });
  });
