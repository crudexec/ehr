import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/errors';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  return password.length >= 8;
};

export const validateRegistration = (req: Request, res: Response, next: NextFunction) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return next(new ValidationError('All fields are required'));
  }

  if (!validateEmail(email)) {
    return next(new ValidationError('Invalid email format'));
  }

  if (!validatePassword(password)) {
    return next(new ValidationError('Password must be at least 8 characters'));
  }

  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ValidationError('Email and password are required'));
  }

  if (!validateEmail(email)) {
    return next(new ValidationError('Invalid email format'));
  }

  next();
};

export const validatePagination = (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  if (page < 1) {
    return next(new ValidationError('Page must be greater than 0'));
  }

  if (limit < 1 || limit > 100) {
    return next(new ValidationError('Limit must be between 1 and 100'));
  }

  req.query.page = page.toString();
  req.query.limit = limit.toString();

  next();
};
