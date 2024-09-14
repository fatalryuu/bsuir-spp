import express from 'express';
import multer from 'multer';
import controller from './controller';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', authMiddleware, upload.single('file'), controller.upload);

export default router;
