import express from 'express';
import { CategoryController } from './categroy.controller';

const router = express.Router();

router.post('/create-category', CategoryController.insertIntoDB);

export const categoryRoutes = router;
