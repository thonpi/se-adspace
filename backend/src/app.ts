import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');

import router from './routers';
import env from './utils/env';
import publicRouter from './routers/public-router';
import e from 'express';

const app = express();

app.use(express.static('public'));
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow non-browser requests like Postman
      if (env.ALLOWED_ORIGINS.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // if you use cookies/auth
  })
);

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/backend-service-port', (req, res) => {
  res.json({ port: process.env.PORT || 'unknown' });
});

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
