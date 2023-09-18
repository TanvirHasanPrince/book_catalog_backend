import express from 'express';
import { UserController } from './auth.controller';
const router = express.Router();

router.post('/signup', UserController.insertIntoDB);
router.post('/signin', UserController.loginUser);
// router.post('/', auth(ENUM_USER_ROLE.CUSTOMER), UserController.checkMyAuth);

export const authRoutes = router;
