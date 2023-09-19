import express from 'express';
import { CategoryController } from './categroy.controller';

const router = express.Router();

router.post('/create-category', CategoryController.insertIntoDB);
router.get('/', CategoryController.getAllFromDB);
router.get('/:id', CategoryController.getByIdFromDB);

export const categoryRoutes = router;
