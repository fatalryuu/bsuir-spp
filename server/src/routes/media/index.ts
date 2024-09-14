import express from 'express';
import multer from 'multer';
import controller from './controller';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), controller.upload);

export default router;
