import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { authenticate } from '../middleware/auth';
import { validateRegistration, validateLogin } from '../middleware/validation';

const router = Router();

router.post('/register', validateRegistration, AuthController.register.bind(AuthController));
router.post('/login', validateLogin, AuthController.login.bind(AuthController));
router.post(
  '/change-password',
  authenticate,
  AuthController.changePassword.bind(AuthController)
);
router.get('/me', authenticate, AuthController.me.bind(AuthController));

export default router;
