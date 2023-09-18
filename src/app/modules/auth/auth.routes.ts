import express from 'express';
import { UserController } from './auth.controller';
const router = express.Router();

router.post('/signup', UserController.insertIntoDB);
router.post('/signin', UserController.loginUser);


export const authRoutes = router;
