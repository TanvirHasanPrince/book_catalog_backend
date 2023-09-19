import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validations';

const router = express.Router();

router.post('/create-category', CategoryController.insertIntoDB);
router.get('/', CategoryController.getAllFromDB);
router.get('/:id', CategoryController.getByIdFromDB);
router.patch(
  '/:id',
  validateRequest(CategoryValidation.update),
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.updateByIDFromDB
);
router.delete(
  '/:id',auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteByIDFromDB
);
export const categoryRoutes = router;
