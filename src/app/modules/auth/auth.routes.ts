import express from 'express';
import { UserController } from './auth.controller';
const router = express.Router();

router.post(
  '/signin', UserController.insertIntoDB
);


export const authRoutes = router;
