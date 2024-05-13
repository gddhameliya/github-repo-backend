import express from 'express';
import { userController } from '../controllers/user.controller';
const router = express.Router();

//? POST
//* Register user API
router.post('/sign-up', userController.registerUser.validation, userController.registerUser.handler);

//? POST
//* Sign in user API
router.post('/sign-in', userController.signIn.validation, userController.signIn.handler);

export default router;
