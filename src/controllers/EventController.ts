import { Request, Response, NextFunction } from 'express';
import EventService from '../services/EventService';
import { sendSuccess, sendCreated, sendNoContent } from '../utils/response';

export class EventController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const organizerId = req.user!.userId;
      const event = await EventService.create(organizerId, req.body);

      return sendCreated(res, event, 'Event created successfully');
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await EventService.findAll({ page, limit });

      return sendSuccess(res, result, 'Events retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const event = await EventService.findById(id);

      return sendSuccess(res, event, 'Event retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getByDateRange(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;

      const events = await EventService.findByDateRange(
        new Date(startDate as string),
        new Date(endDate as string)
      );

      return sendSuccess(res, events, 'Events retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getMyEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const events = await EventService.findByUserId(userId);

      return sendSuccess(res, events, 'Your events retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const event = await EventService.update(id, req.body);

      return sendSuccess(res, event, 'Event updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async cancel(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const event = await EventService.cancel(id);

      return sendSuccess(res, event, 'Event cancelled successfully');
    } catch (error) {
      next(error);
    }
  }

  async complete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { notes } = req.body;

      const event = await EventService.complete(id, notes);

      return sendSuccess(res, event, 'Event marked as completed');
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await EventService.delete(id);

      return sendNoContent(res);
    } catch (error) {
      next(error);
    }
  }
}

export default new EventController();
