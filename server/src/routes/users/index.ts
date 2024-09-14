import express from 'express';
import controller from './controller';
import { zodValidation } from '../../middlewares/zodValidation';
import schema from './schema';

const router = express.Router();

router.get('/', zodValidation(schema.getUsers), controller.getUsers);
router.post('/', zodValidation(schema.createUser), controller.createUsers);
router.delete('/:id', zodValidation(schema.deleteUser), controller.deleteUser);
router.patch('/:id', zodValidation(schema.editUser), controller.editUser);

export default router;
