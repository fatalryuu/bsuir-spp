import express from 'express';
import controller from './controller';
import { zodValidation } from '../../middlewares/zodValidation';
import schema from './schema';

const router = express.Router();

router.post('/login', zodValidation(schema.login), controller.login);

export default router;
