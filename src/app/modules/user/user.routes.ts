import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN),UserController.getAllFromDB)
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN),UserController.getSingleUserByIDFromDB)


export const userRoutes = router;
