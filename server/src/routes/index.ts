import express from 'express';

import health from './health';
import users from './users';
import media from './media';
import { globalErrorHandler } from '../middlewares/globalErrorHandler';

const apiV1 = '/api/v1';

export default (app: express.Application) => {
  app.use(`${apiV1}/`, health);
  app.use(`${apiV1}/users`, users);
  app.use(`${apiV1}/media`, media);

  app.use(globalErrorHandler);
};
