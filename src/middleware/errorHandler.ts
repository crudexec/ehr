import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import logger from '../utils/logger';
import { sendError } from '../utils/response';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error('Error occurred:', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  if (err instanceof AppError) {
    return sendError(res, err.message, err.statusCode);
  }

  // Handle specific error types
  if (err.name === 'ValidationError') {
    return sendError(res, err.message, 400);
  }

  if (err.name === 'JsonWebTokenError') {
    return sendError(res, 'Invalid token', 401);
  }

  if (err.name === 'TokenExpiredError') {
    return sendError(res, 'Token expired', 401);
  }

  // Default to 500 server error
  return sendError(res, 'Internal server error', 500);
};

export const notFoundHandler = (req: Request, res: Response) => {
  return sendError(res, `Route ${req.path} not found`, 404);
};
