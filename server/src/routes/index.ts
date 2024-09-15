import express from 'express';

import health from './health';
import { globalErrorHandler } from '../middlewares/globalErrorHandler';

const apiV1 = '/api/v1';

export default (app: express.Application) => {
  app.use(`${apiV1}/`, health);

  app.use(globalErrorHandler);
};
