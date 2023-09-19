import express from 'express'
import { OrderController } from './order.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router()

router.post('/create-order', auth(ENUM_USER_ROLE.CUSTOMER),OrderController.checkMyAuth);

router.get('/', auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN),OrderController.getAllFromDB);




export const orderRoutes = router;