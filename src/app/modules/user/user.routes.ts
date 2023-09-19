import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validations';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN),UserController.getAllFromDB)
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN),UserController.getSingleUserByIDFromDB)
router.patch('/:id', validateRequest(UserValidation.update),auth(ENUM_USER_ROLE.ADMIN),UserController.updateSingleUserByIDFromDB)
router.delete('/:id', validateRequest(UserValidation.update),auth(ENUM_USER_ROLE.ADMIN),UserController.deleteUserByIDFromDB)


export const userRoutes = router;
