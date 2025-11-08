import { Request, Response, NextFunction } from 'express';
import IntakeFormService from '../services/IntakeFormService';
import { sendSuccess, sendCreated, sendNoContent } from '../utils/response';

export class IntakeFormController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const form = await IntakeFormService.create(userId, req.body);

      return sendCreated(res, form, 'Intake form created successfully');
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const form = await IntakeFormService.findById(id);

      return sendSuccess(res, form, 'Intake form retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await IntakeFormService.findByUserId(userId, { page, limit });

      return sendSuccess(res, result, 'Intake forms retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const form = await IntakeFormService.update(id, req.body);

      return sendSuccess(res, form, 'Intake form updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const form = await IntakeFormService.updateStatus(id, status);

      return sendSuccess(res, form, 'Intake form status updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await IntakeFormService.delete(id);

      return sendNoContent(res);
    } catch (error) {
      next(error);
    }
  }
}

export default new IntakeFormController();
