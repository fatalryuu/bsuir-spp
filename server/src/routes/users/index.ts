import express from 'express';
import controller from './controller';
import { zodValidation } from '../../middlewares/zodValidation';
import schema from './schema';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware, zodValidation(schema.getUsers), controller.getUsers);
router.post('/', authMiddleware, zodValidation(schema.createUser), controller.createUsers);
router.delete('/:id', authMiddleware, zodValidation(schema.deleteUser), controller.deleteUser);
router.patch('/:id', authMiddleware, zodValidation(schema.editUser), controller.editUser);

export default router;
