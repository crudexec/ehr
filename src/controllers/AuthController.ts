import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService';
import { sendSuccess, sendCreated } from '../utils/response';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, firstName, lastName, role } = req.body;

      const result = await AuthService.register({
        email,
        password,
        firstName,
        lastName,
        role,
      });

      return sendCreated(res, result, 'User registered successfully');
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const result = await AuthService.login(email, password);

      return sendSuccess(res, result, 'Login successful');
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user!.userId;

      await AuthService.changePassword(userId, currentPassword, newPassword);

      return sendSuccess(res, null, 'Password changed successfully');
    } catch (error) {
      next(error);
    }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      return sendSuccess(res, req.user, 'User info retrieved');
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
